import { GetObjectCommand, NoSuchKey } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

import s3 from '../config/aws.config'
import S3ObjectNotFoundError from '../models/error'

export async function getVideoStreamFromS3(key: string, range?: string) {
  const bucket = process.env.AWS_BUCKET_NAME!

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    Range: range,
  })

  try {
    const response = await s3.send(command)

    return {
      stream: response.Body as Readable,
      contentType: response.ContentType || 'video/mp4',
      contentLength: response.ContentLength,
      contentRange: response.ContentRange,
      statusCode: range ? 206 : 200,
    }
  } catch (error) {
    if (error instanceof NoSuchKey) {
      throw new S3ObjectNotFoundError()
    }
    throw error
  }
}
