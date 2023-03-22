'use client';

import { useRouter } from "next/navigation";

export default function ChatError() {
  const router = useRouter();

  const refresh = (e: React.MouseEvent<HTMLButtonElement>) => router.refresh();

  return (
    <div className="w-full h-full bg-rose-100 flex flex-col justify-center items-center text-rose-700 space-y-10">
      <h1 className="text-4xl">Error :(</h1>
      <button onClick={refresh} className="block bg-rose-700 text-xl text-white p-4 hover:bg-rose-600 transition-colors duration-75">
        Refresh
      </button>
    </div>
  );
}