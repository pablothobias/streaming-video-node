import cluster from "cluster";
import { cpus } from "os";

import app from "./app";

const numCPUs = cpus().length;
const PORT = process.env.PORT || 8080;

if (cluster.isPrimary) {
  console.log(`🧠 Master ${process.pid} is running`);
  console.log(`📦 Spawning ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  cluster.on("exit", (worker, _code, _signal) => {
    console.log(`💀 Worker ${worker.process.pid} died. Spawning a new one...`);
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`🚀 Worker ${process.pid} running on port ${PORT}`);
  });
}
