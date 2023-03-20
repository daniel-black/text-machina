import { MAX_TOKENS, SYSTEM_MESSAGE, TURBO } from "@/lib/constants";
import { openai } from "@/lib/openai";
import { Message } from "@/lib/zod";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as { messages: Message[] };

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const completions = await openai.createChatCompletion({
    model: TURBO,
    messages: [
      SYSTEM_MESSAGE,
      ...messages,
    ],
    temperature: 0.5,
    max_tokens: MAX_TOKENS,
    
  });

  console.log(completions);

  return new Response(JSON.stringify(completions.data.choices[0].message), {
    status: 200,
    statusText: 'yeehaw'
  });
}