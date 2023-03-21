import Link from "next/link";
import { LayoutProps } from "../layout";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col justify-start items-center py-14 space-y-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="hover:underline underline-offset-4 transition-all duration-75">{'<'} back</Link>
      </div>
      {children}
    </div>
  );
}