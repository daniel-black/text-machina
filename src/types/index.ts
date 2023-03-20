export type Role = 'system' | 'assistant' | 'user';

export type Message = {
  role: Role;
  content: string;
};

export type Conversation = {
  id: number;
  name: string;
  messages: Message[];
};