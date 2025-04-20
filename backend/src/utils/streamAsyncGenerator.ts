import { Readable } from "stream";

export default async function* streamToAsyncIterator(
  stream: Readable,
  chunkSize = 1024 * 1024,
): AsyncGenerator<Buffer> {
  let buffer = Buffer.alloc(0);

  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);

    while (buffer.length >= chunkSize) {
      yield buffer.subarray(0, chunkSize);
      buffer = buffer.subarray(chunkSize);
    }
  }

  if (buffer.length > 0) {
    yield buffer;
  }
}
