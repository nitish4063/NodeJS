const express = require("express");
const cluster = require("cluster");
const os = require("os");

const totalCPUs = os.cpus().length;

// WE CAN REDUCE THE LOAD ON MAIN SERVER BY USING CLUSTERS
// ASSIGN SOME WORKERS(total threads on laptop)
// AND THE REQUEST BY CLIENT IS SENT TO THE AVAILABLE WORKER
// SO IF WE MANY USERS ON THE SERVER, THE LOAD IS DIVIDED

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    return res.json(`hey there ${process.pid}`);
  });

  console.log(`Worker ${process.pid} started`);

  app.listen(8080);
}
