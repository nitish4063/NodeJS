const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

// SOCKET.IO
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    console.log("A new user Message: ", message);
    io.emit("message from server", message);
  });
});

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

server.listen(8080, () => console.log("Server running at PORT 8080"));
