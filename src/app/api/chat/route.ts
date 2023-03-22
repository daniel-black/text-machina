import { SYSTEM_MESSAGE, TURBO } from "@/lib/constants";
import { Message } from "@/lib/zod";
import { OpenAI } from "openai-streams";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as { messages: Message[] };
    
    const stream = await OpenAI('chat', {
      model: TURBO,
      messages: [
        SYSTEM_MESSAGE,
        ...messages,
      ],
      
    });
  
    return new Response(stream);
  } catch (e) {
    throw e;
  }
}

// Erroring in prod
// Gonna try a node runtime endpoint

// TypeError: Illegal invocation
//     at src/app/api/chat/stream/route.ts:9:33
//     at index.js:104:17132
//     at node_modules/next/dist/esm/server/async-storage/static-generation-async-storage-wrapper.js:29:0
//     at node_modules/next/dist/esm/server/async-storage/static-generation-async-storage-wrapper.js:3:50
//     at index.js:104:16638
//     at node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js:61:0
//     at node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js:26:41
//     at node_modules/next/dist/esm/server/future/route-handlers/app-route-route-handler.js:286:0