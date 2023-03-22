'use client';

import { Message } from "@/lib/zod";
import { useStore } from "@/store";
import { getChunksFromChunk, getDataStream, yieldStream } from "@/utils/stream";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";


export default function MessageInput() {
  const chatId = useStore(state => state.chatId);
  const messages = useStore(state => state.messages);
  const addMessage = useStore(state => state.addMessage);
  const isStreaming = useStore(state => state.isStreaming);
  const setIsStreaming = useStore(state => state.setIsStreaming);
  const updateLastMessageContent = useStore(state => state.updateLastMessageContent);

  const [readyToSave, setReadyToSave] = useState<boolean>(false);

  console.log({readyToSave})

  let inputRef = useRef<HTMLInputElement>(null);

  // when readyToSave is true, the useEffect fires off a call to save chat messages
  // useEffect(() => {
  //   async function saveData() {
  //     if (messages.length === 2 && chatId === undefined) {
  //       // create chat in DB
  //       const res = await fetch('/api/db/chat', {
  //         method: 'POST',
  //         body: JSON.stringify(messages),
  //       });
      
  //       if (!res.ok) throw new Error(res.statusText);
      
  //       const data = await res.json();
  //       console.log(data)
  //     }

  //     setReadyToSave(false);
  //   }

  

  //   if (readyToSave) {
  //     saveData();
  //   }
  // }, [readyToSave]);
  

  const handleFocus = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [inputRef]);

  const handleBlur = useCallback(() => {
    if (inputRef.current) inputRef.current.blur();
  }, [inputRef]);
  
  const processChunk = (chunk: string) => {
    const parsedChunk = JSON.parse(chunk);

    if (Object.hasOwn(parsedChunk, 'role')) {
      addMessage({ role: parsedChunk.role, content: '' });
    } else if (Object.hasOwn(parsedChunk, 'content')) {
      updateLastMessageContent(parsedChunk.content)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputRef.current?.value || inputRef.current.value === '') return;

    const newMessage: Message = { role: 'user', content: inputRef.current.value };
    addMessage(newMessage);

    setIsStreaming(true);
    const stream = await getDataStream([...messages, newMessage]);
    setIsStreaming(false);

    for await (const chunk of yieldStream(stream)) {
      if (chunk === '{}') continue;
      const chunks = getChunksFromChunk(chunk);

      // most of the time the chunks array will just have one element.
      if (chunks.length === 1) {
        processChunk(chunks[0]);
      } else {
        for (const c of chunks) {
          processChunk(c);
        }
      }
    }

    inputRef.current.value = '';
    
    setReadyToSave(true);
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
        <button disabled={isStreaming} className="px-6 bg-black text-white flex justify-center items-center">SEND</button>
      </form>
    </div>
  );
}

