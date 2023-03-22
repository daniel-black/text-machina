'use client';

import { Message } from "@/lib/zod";
import { useStore } from "@/store";
import { getDataStream, yieldStream } from "@/utils/stream";
import { FormEvent, useCallback, useRef } from "react";

export default function MessageInput() {
  const chatId = useStore(state => state.chatId);
  const messages = useStore(state => state.messages);
  const addMessage = useStore(state => state.addMessage);
  const isStreaming = useStore(state => state.isStreaming);
  const setIsStreaming = useStore(state => state.setIsStreaming);
  const updateLastMessageContent = useStore(state => state.updateLastMessageContent);

  let inputRef = useRef<HTMLInputElement>(null);

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
      if (chunk === '{}') continue;  // the last chunk in the stream is `{}` so just skip it

      console.log(chunk);
      const chunks = getChunksFromChunk(chunk);
      console.log(chunks);

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

function findSplitIndices(chunk: string) {
  const indices: number[] = [];

  for (let i = 1; i < chunk.length - 1; i++) {
    if (chunk[i] === '}' && chunk[i + 1] === '{') {
      indices.push(i + 1);
    }
  }

  return indices;
}

// Sometimes a chunk will actually be multiple chunks like:
// {"role":"assistant"}{"content":"In"}{"content":" the"}
// so we need to further break it down into the true individual pieces
function getChunksFromChunk(chunk: string) {
  const chunks: string[] = [];
  const splitIndices = findSplitIndices(chunk);
  
  if (splitIndices.length === 0) {
    chunks.push(chunk);
  } else {
    let startIndex = 0;
    for (let i = 0; i < splitIndices.length; i++) {
      const endIndex = splitIndices[i];
      chunks.push(chunk.slice(startIndex, endIndex));
      startIndex = endIndex;
    }
    chunks.push(chunk.slice(startIndex));
  }

  return chunks;
}