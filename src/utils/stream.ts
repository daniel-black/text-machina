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
