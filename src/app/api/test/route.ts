import { COMPLETIONS_URL, MAX_TOKENS, SYSTEM_MESSAGE, TEMPERATURE, TURBO } from "@/lib/constants";
import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content } = await req.json() as { content: string };
  const apiKey = process.env.OPENAI_API_KEY;

  // await fetch(COMPLETIONS_URL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${apiKey}`,
  //   },
  //   body: JSON.stringify({
  //     model: TURBO,
  //     temperature: TEMPERATURE,

  //   }),
  // })

  const completions = await openai.createChatCompletion({
    model: TURBO,
    messages: [
      SYSTEM_MESSAGE,
      { role: 'user', content }
    ],
    temperature: 0.5,
    max_tokens: MAX_TOKENS,
  });

  console.log(completions.data.choices[0].message);

  return new Response(completions.data.choices[0].message, {
    status: 200,
    statusText: 'yeehaw'
  });
}