import { create } from "zustand";
import { Message } from "./lib/zod";

type AppState = {
  chatId: number | undefined;
  messages: Message[];
  isStreaming: boolean;
  setIsStreaming: (val: boolean) => void;
  setChatId: (newChatId: number) => void;
  addMessage: (newMessage: Message) => void;
  updateLastMessageContent: (chunk: string) => void;
};

export const useStore = create<AppState>()((set) => ({
  chatId: undefined,
  messages: [],
  isStreaming: false,
  setIsStreaming: (val) => set({ isStreaming: val }),
  setChatId: (newChatId) => set({ chatId: newChatId }),
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
  updateLastMessageContent: (chunk) => set((state) => ({
    messages: [
      ...state.messages.slice(0, -1),
      {
        role: state.messages[state.messages.length - 1].role,
        content: state.messages[state.messages.length - 1].content + chunk,
      },
    ]
  })),
}));