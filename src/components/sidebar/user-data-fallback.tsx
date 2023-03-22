export default function UserDataFallback() {
  return (
    <>
      <div className="flex-1 p-2 space-y-2 border-y border-black">
        <div className="text-sm select-none">
          Previous chats
        </div>
        <ul className="space-y-1">
          <li className="h-3 w-full bg-black animate-pulse"></li>
          <li className="h-3 w-full bg-black animate-pulse"></li>
          <li className="h-2/3 w-full bg-black animate-pulse"></li>
          <li className="h-1/3 w-full bg-black animate-pulse"></li>
        </ul>
      </div>
      <div className="text-xs p-2 space-y-0.5">
        <div className="h-3 w-full bg-black animate-pulse" />
        <div className="h-3 w-1/3 bg-black animate-pulse" />
      </div>
    </>
  );
}