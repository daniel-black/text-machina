import { Message } from "@/lib/zod";
import { Dispatch, SetStateAction } from "react";

type MessageInputProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  onSend: (message: Message) => void;
}

export default function MessageInput({ content, setContent, onSend }: MessageInputProps) {
  return (
    <div className="h-32 border-t border-black flex justify-center items-center">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSend({ role: 'user', content });
        }}
        className="w-[80%] flex justify-center items-center"
      >
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          type="text"
          className="w-full border border-black p-3 outline-none"
          required
        />
        <button
          className="p-3 border border-l-0 border-black bg-black text-white flex justify-center items-center"
        >
          SEND
        </button>
      </form>
    </div>
  );
}