'use client';

import { Dispatch, SetStateAction, useState } from "react";

// This is the component that stores context to a chat thread

export default function Chat() {
  const [userMessage, setUserMessage] = useState<string>('');

  return (
    <main className="h-screen flex flex-col">
      <section className="bg-rose-200 flex-1">
        the messages will go here
      </section>
      <MessageInput message={userMessage} setMessage={setUserMessage} />
    </main>
  );
}

function ChatMessage({ isUser, text }: { isUser: boolean, text: string }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <section className={`w-fit max-w-[80%] p-4 border border-black ${isUser ? '' : 'bg-black text-white'}`}>
        {text}
      </section>
    </div>
  );
}

type MessageInputProps = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

function MessageInput({ message, setMessage }: MessageInputProps) {
  return (
    <div className="h-36 border-t border-black flex justify-center items-center">
      <form className="w-[80%] flex justify-center items-center">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text"
          className="w-full border border-black p-3 outline-none"
          required
        />
        <button
          className="p-3 border border-l-0 border-black bg-black text-white flex justify-center items-center"
          onClick={(e) => {
            e.preventDefault();
            console.log(message)
          }}
        >
          SEND
        </button>
      </form>
    </div>
  )
}