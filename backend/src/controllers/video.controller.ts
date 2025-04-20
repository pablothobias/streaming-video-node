import { Request, Response, NextFunction } from 'express'
import { getVideoStreamFromS3 } from '../services/video.service'
import streamToAsyncIterator from '../utils/streamAsyncGenerator'

export async function streamVideo(req: Request, res: Response, next: NextFunction) {
  const { key } = req.params
  const range = req.headers.range

  if (!range || !key) return res.status(!key ? 400 : 416).send(`Requires ${!key ? 'video key' : 'Range header'}`)

  try {
    const { stream, contentType, contentLength, contentRange, statusCode } = await getVideoStreamFromS3(key, range)

    res.writeHead(statusCode, {
      'Content-Type': contentType,
      'Content-Length': contentLength,
      'Content-Range': contentRange,
      'Accept-Ranges': 'bytes',
    })

    for await (const chunk of streamToAsyncIterator(stream)) {
      res.write(chunk)
    }

    res.end()
  } catch (error) {
    console.error('Stream error:', error)
    res.status(500).send('Error streaming video')
  }
}
