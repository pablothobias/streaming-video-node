import 'dotenv/config'

import { ListObjectsV2Command } from '@aws-sdk/client-s3'

import s3 from '../src/config/aws.config'
;(async () => {
  const bucket = process.env.AWS_BUCKET_NAME!

  console.log('========== Bucket ==========', bucket)

  if (!bucket) {
    throw new Error('AWS_BUCKET_NAME is not defined in .env')
  }

  const res = await s3.send(new ListObjectsV2Command({ Bucket: bucket }))
  console.log(res.Contents)
})()
