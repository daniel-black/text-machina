import Link from "next/link";

export default function PreviousChats() {
  return (
    <div className="flex-1 p-2 space-y-2 border-y border-black">
      <div className="text-sm select-none">Previous chats (4)</div>
      <ul className="space-y-1">
        <li><Link href="/chat">Chat 1</Link></li>
        <li><Link href="/chat">Chat 2</Link></li>
        <li><Link href="/chat">Chat 3</Link></li>
        <li><Link href="/chat">Chat 4</Link></li>
      </ul>
    </div>
  );
}