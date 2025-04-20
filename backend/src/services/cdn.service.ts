import { CLOUDFRONT_DOMAIN } from '../config/cloudfront.config'

export default function getPublicVideoUrl(key: string): string {
  return `https://${CLOUDFRONT_DOMAIN}/${key}`
}
