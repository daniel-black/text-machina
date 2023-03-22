import { Message } from "@/lib/zod";
import { Dispatch, SetStateAction } from "react";

type MessageInputProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  onSend: (message: Message) => void;
}

export default function MessageInput({ content, setContent, onSend }: MessageInputProps) {
  return (
    <div className="h-[91px] border-t border-black">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSend({ role: 'user', content });
        }}
        className="flex bg-blue-500 h-full"
      >
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full h-full inline px-10 py-2 outline-none text-lg"
          spellCheck={false}
          placeholder=">"
          required
        />
        <button
          className="px-6 bg-black text-white flex justify-center items-center"
        >
          SEND
        </button>
      </form>
    </div>
  );
}