import { LayoutProps } from "../layout";
import Sidebar from "@/components/sidebar/sidebar";

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex justify-start">
      <Sidebar />
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}