'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function User({ email }: { email: string | undefined }) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
    router.push('/');
  }

  return (
    <div className="text-xs p-2 space-y-0.5">
      {email && <div>{email}</div>}
      <div>
        <button onClick={handleClick} className="hover:underline underline-offset-4 transition-all duration-75">log out</button>
      </div>
    </div>
  );
}