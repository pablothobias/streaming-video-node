import { NextFunction, Request, Response } from "express";

import getPublicVideoUrl from "../services/cdn.service";
import { getVideoStreamFromS3 } from "../services/video.service";
import streamToAsyncIterator from "../utils/streamAsyncGenerator";

export async function streamVideo(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const { key } = req.params;
  const range = req.headers.range;
  const chunkSize = parseInt(req.query.chunkSize as string) || 1024 * 1024;

  if (!range || !key) {
    res
      .status(!key ? 400 : 416)
      .send(`Requires ${!key ? "video key" : "Range header"}`);

    return;
  }

  try {
    const { stream, contentType, contentLength, contentRange, statusCode } =
      await getVideoStreamFromS3(key, range);

    res.writeHead(statusCode, {
      "Content-Type": contentType,
      "Content-Length": contentLength,
      "Content-Range": contentRange,
      "Accept-Ranges": "bytes",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    });

    for await (const chunk of streamToAsyncIterator(stream, chunkSize)) {
      res.write(chunk);
      console.log({ chunk });
    }

    res.end();
    return;
  } catch (error) {
    console.error("Stream error:", error);
    res.status(500).send("Error streaming video");
  }
}

export async function getVideoUrl(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const { key } = req.params;

  if (!key) {
    res.status(400).json({ error: "Missing video key" });
    return;
  }

  const url = getPublicVideoUrl(key);
  res.json({ url });
  return;
}
