import Link from "next/link";
import { LayoutProps } from "../layout";

const chats = ['Famous french authors', 'Macaroni recipe', 'Go HTTP request', 'Forgotten cosmologies'];

export default function ChatLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex">
      <SideBar />
      <main className="w-5/6">
        {children}
      </main>
    </div>
  );
}

function SideBar() {
  return (
    <section className="w-1/6 border-r border-black p-4 space-y-3">
      {/* Could use Suspense here while loading in chats */}
      <h2 className="text-lg">Chats</h2>
      <ul className="opacity-75 space-y-2">
        {chats.map((chat, index) => <li key={index}><Link href={`/chat/${index}`}>{chat}</Link></li>)}
      </ul>
    </section>
  );
}