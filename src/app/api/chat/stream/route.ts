import { SYSTEM_MESSAGE, TURBO } from "@/lib/constants";
import { Message } from "@/lib/zod";
import { NextRequest } from "next/server";
import { OpenAI } from "openai-streams";

export const runtime = 'experimental-edge';

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as { messages: Message[] };

  const stream = await OpenAI('chat', {
    model: TURBO,
    messages: [
      SYSTEM_MESSAGE,
      ...messages,
    ],
    
  });

  return new Response(stream);
}