import { LayoutProps } from "../layout";

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {children}
    </div>
  );
}