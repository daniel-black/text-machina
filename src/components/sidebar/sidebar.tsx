import Link from "next/link";
import User from "./user";
import PreviousChats from "./previous-chats";

export default function Sidebar() {
  return (
    <section className="w-1/6 h-screen flex flex-col border-r border-black">
      <Link href="/" className="block text-center p-2 m-2 border border-black border-dashed hover:border-solid">＋New</Link>
      <PreviousChats />
      <User />
      <Link href="/chat" className="block text-center py-2 bg-black text-white">Text Machina</Link>
    </section>
  );
}