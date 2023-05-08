const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const PORT = 8080;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("reload", () => {
    io.emit("reload");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(PORT, () => {
  console.log("server listening. Port:" + PORT);
});