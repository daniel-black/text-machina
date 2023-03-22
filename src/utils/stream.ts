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

// Sometimes a chunk will actually be multiple chunks like:
// {"role":"assistant"}{"content":"In"}{"content":" the"}
// so we need to further break it down into the true individual pieces
export function getChunksFromChunk(chunk: string) {
  const chunks: string[] = [];
  const splitIndices = findSplitIndices(chunk);
  
  if (splitIndices.length === 0) {
    chunks.push(chunk);
  } else {
    let startIndex = 0;
    for (let i = 0; i < splitIndices.length; i++) {
      const endIndex = splitIndices[i];
      chunks.push(chunk.slice(startIndex, endIndex));
      startIndex = endIndex;
    }
    chunks.push(chunk.slice(startIndex));
  }

  return chunks;
}

function findSplitIndices(chunk: string) {
  const indices: number[] = [];

  for (let i = 1; i < chunk.length - 1; i++) {
    if (chunk[i] === '}' && chunk[i + 1] === '{') {
      indices.push(i + 1);
    }
  }

  return indices;
}