'use client';

import { FormEvent, useRef } from "react";

export default function MessageInput2() {
  let inputRef = useRef<HTMLInputElement>(null);

  console.log('rendering')

  const handleFocus = () => {
    if (inputRef.current) inputRef.current.focus();
  }

  const handleBlur = () => {
    if (inputRef.current) inputRef.current.blur();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Upon enter, we 
    if (!inputRef.current?.value) return;
    console.log(inputRef.current?.value)
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
          required
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