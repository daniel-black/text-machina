import { Message } from "@/lib/zod";

export async function* yieldStream(stream: ReadableStream): AsyncIterable<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      reader.releaseLock();
      break;
    }

    yield decoder.decode(value);
  }
}

export async function getDataStream(messages: Message[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const readableStream = response.body;

  if (!readableStream) {
    throw new Error('no data')
  }

  return readableStream;
}