import Link from "next/link";
import { LayoutProps } from "../layout";
import { UserButton } from "@clerk/nextjs/app-beta";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex justify-start">
      <section className="w-1/6 h-screen flex flex-col border-r border-black">
        <Link href="/" className="block text-center p-2 m-2 border border-black border-dashed hover:border-solid">＋New</Link>



        <div className="flex-1 p-2 space-y-2 border-y border-black">
          <div className="text-sm select-none">Previous chats (0)</div>
          <ul className="space-y-1">
            <li><Link href="/chat">Chat 1</Link></li>
            <li><Link href="/chat">Chat 2</Link></li>
            <li><Link href="/chat">Chat 3</Link></li>
            <li><Link href="/chat">Chat 4</Link></li>
          </ul>
        </div>
        <UserButton afterSignOutUrl="/" appearance={{
           elements: {
            avatarBox: {
              'display': 'none'
            }
           }
        }} showName />
        <Link href="/chat" className="block text-center py-2 bg-black text-white">Text Machina</Link>
      </section>
      <main>
        {children}
      </main>
    </div>
  );
}