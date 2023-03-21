import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen w-full px-4 py-20 flex justify-center items-start bg-black text-white">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl">⦿ Text Machina</h1>

        <div className="text-lg space-y-2">
          <SignedOut>
            <CursorLink href="/sign-up" text="sign up" />
            <CursorLink href="/sign-in" text="sign in" />
          </SignedOut>

          <SignedIn>
            <CursorLink href="/welcome" text="begin" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

function CursorLink({ href, text }: { href: string, text: string }) {
  return (
    <div className="space-x-3">
      <span className="animate-pulse">{'>'}</span>
      <Link href={href} className="hover:underline underline-offset-4 transition-all duration-75">{text}</Link>
    </div>
  );
}