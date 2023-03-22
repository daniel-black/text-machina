import MessageInput from "@/components/chat/message-input";
import { LayoutProps } from "../layout";
import Sidebar from "@/components/sidebar/sidebar";
import MessageInput2 from "@/components/chat/message-input2";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex justify-start">
      <Sidebar />
      <main className="w-full">
        {children}
        <MessageInput2 />
      </main>
    </div>
  );
}