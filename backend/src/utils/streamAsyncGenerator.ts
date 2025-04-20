import { Readable } from "stream";

export default async function* streamToAsyncIterator(
  stream: Readable,
): AsyncGenerator<Buffer> {
  for await (const chunk of stream) {
    yield chunk as Buffer;
  }
}
