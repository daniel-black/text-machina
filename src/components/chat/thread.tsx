'use client';

import { useStore } from "@/store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Essentially a readonly component. Just displays previous message history
export default function Thread() {
  const messages = useStore(state => state.messages);
  const isStreaming = useStore(state => state.isStreaming);

  return (
    <section className="flex-1 p-4 space-y-4 overflow-y-scroll">
      {messages.length > 0 ? (
        messages.map((m, i) => <ChatMessage key={i} isUser={m.role === 'user'} text={m.content} />)
      ) : (
        <div className="h-full flex justify-center items-center">
          Ask something.
        </div>
      )}
      {isStreaming && <ChatMessage isUser={false} text="Dreaming..." />}
    </section>
  );
}

function ChatMessage({ isUser, text }: { isUser: boolean, text: string }) {
  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'}`}>
      <section className={`w-fit max-w-[80%] p-4 border border-black ${isUser ? '' : 'bg-black text-white'}`}>
        {isUser ? (text) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {text}
          </ReactMarkdown>
        )}
      </section>
    </div>
  );
}