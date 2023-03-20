'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ApiKeyForm() {
  const [key, setKey] = useState<string>('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // throw it in session storage for now
    sessionStorage.setItem('apiKey', key);

    router.push('/chat');
  }

  return (
    <div className="space-y-4 text-opacity-75">
      <p>Enter your <Link href='https://platform.openai.com/account/api-keys' className="underline underline-offset-4 hover:bg-black hover:bg-opacity-10 transition-all duration-75">OpenAI API Key</Link> to get started:</p>
      <form onSubmit={handleSubmit} className="w-full flex">
        <input
          value={key}
          onChange={e => setKey(e.target.value)}
          type="text"
          className="outline-none border border-black py-2 px-3 w-5/6"
          spellCheck={false}
          required
        />
        <button className="py-2 w-1/6 bg-black text-white border border-black hover:opacity-75 transition-opacity duration-75">GO</button>
      </form>
    </div>
  );
}