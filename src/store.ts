import { create } from "zustand";
import { Message } from "./lib/zod";

type AppState = {
  chatId: number | undefined;
  messages: Message[];
  setChatId: (newChatId: number) => void;
  addMessage: (newMessage: Message) => void;
};

export const useStore = create<AppState>()((set) => ({
  chatId: undefined,
  messages: [],
  setChatId: (newChatId) => set({ chatId: newChatId }),
  addMessage: (newMessage) => set((state) => ({ messages: [...state.messages, newMessage] })),
}));