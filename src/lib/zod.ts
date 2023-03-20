import { z } from "zod";

const RoleSchema = z.enum(['system', 'assistant', 'user']);

export const MessageSchema = z.object({
  role: RoleSchema,
  content: z.string().min(1).max(200),
});
export type Message = z.infer<typeof MessageSchema>;