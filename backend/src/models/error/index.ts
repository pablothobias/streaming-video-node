export default class S3ObjectNotFoundError extends Error {
  constructor(message = 'Video not found') {
    super(message)
    this.name = 'S3ObjectNotFoundError'
  }
}
