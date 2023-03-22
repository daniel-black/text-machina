'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function User() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
    router.push('/');
  }

  return (
    <div className="text-xs p-2 space-y-0.5">
      <div>{user.primaryEmailAddress?.toString()}</div>
      <div>
        <button onClick={handleClick} className="hover:underline underline-offset-4 transition-all duration-75">log out</button>
      </div>
    </div>
  );
}