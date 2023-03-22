'use client';

import { Message } from "@/lib/zod";
import { useStore } from "@/store";
import { getDataStream, yieldStream } from "@/utils/stream";
import { FormEvent, useRef } from "react";

export default function MessageInput() {
  const chatId = useStore(state => state.chatId);
  const messages = useStore(state => state.messages);
  const addMessage = useStore(state => state.addMessage);
  const isStreaming = useStore(state => state.isStreaming);
  const setIsStreaming = useStore(state => state.setIsStreaming);
  const updateLastMessageContent = useStore(state => state.updateLastMessageContent);

  let inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  }

  const handleBlur = () => {
    if (inputRef.current) inputRef.current.blur();
  }
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current?.value || inputRef.current.value === '') return;
    console.log(inputRef.current?.value)

    const newMessage: Message = { role: 'user', content: inputRef.current.value };

    addMessage(newMessage);
    setIsStreaming(true);
    const stream = await getDataStream([...messages, newMessage]);
    setIsStreaming(false);

    let isFirst = true;
    for await (const chunk of yieldStream(stream)) {
      if (chunk === '{}') continue;
      
      const i = chunk.indexOf('}{');    // -1 if only one chunk in chunk

      if (isFirst) {
        isFirst = false;
        const newMessage: Message = { role: 'assistant', content: '' }; 
        
        if (i !== -1) {
          // we have two chunks in one
          const { content } = JSON.parse(chunk.slice(i+1));
          newMessage.content = content;
        }

        addMessage(newMessage);
        continue;
      }

      let additionalContent = '';

      if (i !== -1) {
        const c1 = JSON.parse(chunk.slice(0, i + 1));
        const c2 = JSON.parse(chunk.slice(i + 1));
        additionalContent = c1.content + c2.content;
      } else {
        const { content } = JSON.parse(chunk);
        additionalContent = content;
      }

      updateLastMessageContent(additionalContent);
    }

    inputRef.current.value = '';
  }

  return (
    <div className="h-[91px] border-t border-black">
      <form onSubmit={handleSubmit} className="flex bg-blue-500 h-full">
        <input
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="w-full h-full inline px-10 py-2 outline-none text-lg"
          spellCheck={false}
          placeholder=">"
        />
        <button
          className="px-6 bg-black text-white flex justify-center items-center"
        >
          SEND
        </button>
      </form>
    </div>
  );
}