import { Server } from "socket.io";

export default function ServerHandler(req, res) {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Socket is connected");
    });
  }

  res.end();
}
