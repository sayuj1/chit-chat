import { Server } from "socket.io";


export default function ServerHandler(req, res) {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log("Socket is connected");
      });
    }
  } catch (error) {
    console.error("Error occurred during socket.io server creation or connection:", error);
  }

  res.end();
}
