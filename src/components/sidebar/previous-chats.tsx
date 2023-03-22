import { prisma } from "@/lib/prisma";

export default async function PreviousChats({ userId }: { userId: string }) {
  const chats = await prisma.chat.findMany({ where: { userId } });

  const selectChat = (e: React.MouseEvent<HTMLButtonElement>, chatId: number) => {
    e.preventDefault();
    console.log('chatId: ', chatId);
  }

  return (
    <div className="flex-1 p-2 space-y-2 border-y border-black">
      <div className="text-sm select-none">
        Previous chats
      </div>
      {chats.length > 0 ? (
        <ul className="space-y-1">
          {chats.map(chat => (
            <li key={chat.id}>
              <button onClick={(e) => selectChat(e, chat.id)}>
                {chat.name}
              </button>
            </li>
          ))}
        </ul>
        ) : (
          <span className="text-xs">(none)</span>
        )}
    </div>
  );
}