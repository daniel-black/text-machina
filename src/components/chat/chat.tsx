'use client';

import { Message } from "@/lib/zod";
import { useState } from "react";
import MessageInput from "./message-input";

const initialMessages: Message[] = [
  { role: 'user', content: 'Whats up my AI friend?' },
  { role: 'assistant', content: 'Not too much, brethren' },
  { role: 'user', content: 'Catch the game last night?' },
  { role: 'assistant', content: 'Nah I was stuck watching the kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj' },
  { role: 'user', content: 'Rats thats a real bummer' },
  { role: 'assistant', content: 'Yeah dude it sucked' },
  { role: 'user', content: 'Catch the game last night?' },
  { role: 'assistant', content: 'Nah I was stuck watching the kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj kiddos jfkadjkf fkdja  fjkd jfkd jfk k fkjakfj' },
  { role: 'user', content: 'Rats thats a real bummer' },
  { role: 'assistant', content: 'Yeah dude it sucked' },
];

// This is the component that stores context to a chat thread
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);

  async function handleNewMessage(message: Message) {
    const updatedMessages = [...messages, message];

    setMessages(updatedMessages);
    setContent('')
    setIsThinking(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: updatedMessages
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    const updatedMessagesWithResponse = [...updatedMessages, data];
    setMessages(updatedMessagesWithResponse);
    setIsThinking(false);

    console.log(data);
  }

  return (
    <main className="h-screen flex flex-col">
      <MessageThread messages={messages} isThinking={isThinking} />
      <MessageInput content={content} setContent={setContent} onSend={handleNewMessage} />
    </main>
  );
}

type MessageThreadProps = {
  messages: Message[];
  isThinking: boolean;
}

// essentially a readonly component. Just displays previous message history
function MessageThread({ messages, isThinking }: MessageThreadProps) {
  return (
    <section className="flex-1 p-4 space-y-4 overflow-y-scroll">
      {messages.length > 0 ? (
        messages.map((m, i) => <ChatMessage key={i} isUser={m.role === 'user'} text={m.content} />)
      ) : (
        <div className="h-full flex justify-center items-center">
          Ask something.
        </div>
      )}
      {isThinking && <ChatMessage isUser={false} text="Thinking..." />}
    </section>
  );
}

function ChatMessage({ isUser, text }: { isUser: boolean, text: string }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <section className={`w-fit max-w-[80%] p-4 border border-black ${isUser ? '' : 'bg-black text-white'}`}>
        {text}
      </section>
    </div>
  );
}