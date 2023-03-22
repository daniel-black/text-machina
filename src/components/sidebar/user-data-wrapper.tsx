import { currentUser } from "@clerk/nextjs/app-beta";
import PreviousChats from "./previous-chats";
import User from "./user";

export default async function UserDataWrapper() {
  const user = await currentUser();

  if (!user) return <span>Failed to load user data</span>;

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <PreviousChats userId={user.id} />
      <User email={user.emailAddresses.at(0)?.emailAddress} />
    </>
  );
}