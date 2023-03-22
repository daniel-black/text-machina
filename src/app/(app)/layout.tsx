import Link from "next/link";
import { LayoutProps } from "../layout";
import User from "@/components/sidebar/user";
import Sidebar from "@/components/sidebar/sidebar";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex justify-start">
      <Sidebar />
      <main>
        {children}
      </main>
    </div>
  );
}