# 🎥 Node.js Video Streaming with AWS S3 + Async Generators

This is a study project focused on building a high-performance video streaming backend using **Node.js**, **Express**, and **AWS S3**, enhanced with **async generators**, **chunked streaming**, and optional **CloudFront CDN** delivery. The frontend is built with **Next.js 15**.

---

## 📦 Stack

- **Backend**: Node.js + Express
- **Streaming**: AWS S3 + HTTP Range + Async Generators
- **Frontend**: Next.js 15 with App Router
- **Infra**: AWS S3, CloudFront (optional)
- **Performance**: Node.js Cluster module
- **Tools**: TypeScript, Prettier, ESLint, Husky, pnpm

---

## 📁 Project Structure

```
video-streaming-node/
├── src/
│   ├── config/         # AWS & CloudFront setup
│   ├── controllers/    # Express route handlers
│   ├── routes/         # Express routers
│   ├── services/       # S3 + CDN logic
│   ├── utils/          # Stream transformation utilities
│   ├── app.ts          # Express app
│   ├── server.ts       # Basic server entry
│   └── cluster.ts      # Clustered multi-core entry
├── .env                # AWS keys + bucket config
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone and Install
```bash
pnpm install
```

### 2. Configure Environment
Create a `.env` file:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_BUCKET_NAME=your-bucket-name
PORT=3001
```

### 3. Run the Server (Clustered)
```bash
pnpm dev
```

---

## 🌐 Streaming Endpoint

### `GET /api/videos/:key/stream`

Returns a **chunked stream** of the video from S3 using **async generator + HTTP Range support**.

---

## 🧠 Async Generator Streaming

## Dynamic Chunk Size Support

Use the query string to specify the size (in bytes):

```bash
GET /api/videos/sample.mp4/stream?chunkSize=524288  // 512KB
GET /api/videos/sample.mp4/stream?chunkSize=2097152 // 2MB
```

If not provided, the default chunk size is 1 MB (1048576 bytes).

Implemented a custom stream pipe:

```bash
for await (const chunk of streamToAsyncIterator(stream, chunkSize)) {
  res.write(chunk);
}
res.end();
```

This allows fine-grained control over:

- Chunk transformation
- Throttling
- Memory usage

---

## ⚙️ Performance via Clustering

```ts
if (cluster.isPrimary) {
  for (let i = 0; i < cpuCount; i++) cluster.fork();
} else {
  app.listen(PORT);
}
```

Each CPU core handles its own stream requests independently — improves concurrency on load.

---

## 🌍 Frontend with Next.js 15

The frontend is located in the [`next-video-streaming`](https://github.com/your-repo/next-video-streaming) folder and uses a simple `<video>` tag to consume the stream.

```tsx
<video
  controls
  width={720}
  crossOrigin="anonymous"
  src={`http://localhost:3001/api/videos/${videoKey}/stream`}
/>
```

---

## 🛡️ CORS & Streaming

CORS is configured to allow Range-based requests from frontend:

```ts
app.use(cors({
  origin: 'http://localhost:3000',
  exposedHeaders: [
    'Content-Range', 'Accept-Ranges', 'Content-Length', 'Content-Type'
  ]
}));
```

---

## ✅ Optional: Use AWS CloudFront CDN

You can optionally use CloudFront to serve videos directly from S3, bypassing Express. Our controller supports this via:

```ts
GET /api/videos/:key/url
```

This returns a direct CloudFront URL or a **signed URL** for protected content.

---

## 🧪 Testing

- Use the frontend video player
- Or test manually with curl:

```bash
curl -H "Range: bytes=0-1024" http://localhost:3001/api/videos/sample.mp4/stream --output part.mp4
```

---

## 📋 TODO

- [ ] Add signed URL generation with `@aws-sdk/cloudfront-signer`
- [ ] Add Redis caching for headers
- [ ] Add video upload endpoint (Multer + S3 PutObject)
- [ ] Add metrics/logging via Pino or Winston

---

## 🧠 Learnings

- How Node.js handles raw streams
- When to use async generators over `.pipe()`
- How S3 + CloudFront + Range headers work together
- How to scale streaming via clustering
- Browser behavior with cross-origin video

---

## 📚 Resources

- [AWS SDK v3 for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [MDN - HTTP Range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)
- [Node.js Cluster Docs](https://nodejs.org/api/cluster.html)

---

## ✌️ License

MIT — use freely, learn deeply.
