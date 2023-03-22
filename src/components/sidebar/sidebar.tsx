import Link from "next/link";
import { Suspense } from "react";
import UserDataWrapper from "./user-data-wrapper";


export default function Sidebar() {

  return (
    <section className="w-1/6 h-screen flex flex-col border-r border-black">
      <Link href="/chat" className="block text-center p-2 m-2 border border-black border-dashed hover:border-solid">＋New</Link>
      <Suspense fallback={<p>HELLO</p>}>
        {/* @ts-expect-error Server Component */}
        <UserDataWrapper />
      </Suspense>
      <Link href="/chat" className="block text-center py-2 bg-black text-white">Text Machina</Link>
    </section>
  );
}