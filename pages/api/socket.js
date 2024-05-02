import { Server } from "socket.io";
import { LISTENERS as EVENTS, EVENTS as LISTENERS } from "Utils/Constants";

let ROOMS_LIST = [];
let ONLINE_USERS = {};

const onCreateRoomHandle = (data, socket) => {
  const { roomName, username } = data;
  //check room exists in list
  if (!ROOMS_LIST.includes(roomName)) {
    let room = {
      name: roomName,
      username: username,
      messages: [],
      createdAt: new Date(),
    };
    ROOMS_LIST.push(room);
  }

  // notify room owner and other users about new room
  ONLINE_USERS[socket.id].emit(EVENTS.CREATE_ROOM_RESPONSE, roomName);
  socket.broadcast.emit(EVENTS.ALL_ROOMS_LIST, ROOMS_LIST);
};

const onNewMessageHandle = (data, socket) => {
  const { author, message, room, avatar } = data;
  if (!room) return;

  let updatedRoom = ROOMS_LIST.find((r) => r.name == room);
  updatedRoom.messages.push({ author, message, createdAt: new Date(), avatar });

  // send message to all users in the room
  if (updatedRoom) {
    socket.broadcast.emit(EVENTS.NEW_MESSAGE_RESPONSE, updatedRoom);
  }
};

const onRoomSelectedHandle = (roomName, socket) => {
  if (!roomName) return;

  let room = ROOMS_LIST.find((r) => r.name == roomName);
  ONLINE_USERS[socket.id].emit(EVENTS.NEW_MESSAGE_RESPONSE, room);
};

export default function ServerHandler(req, res) {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;

      io.on("connection", (socket) => {
        console.log("Socket is connected");

        const isUserExists = ONLINE_USERS[socket.id];

        if (!isUserExists) ONLINE_USERS[socket.id] = socket;

        socket.emit(EVENTS.ALL_ROOMS_LIST, ROOMS_LIST);

        socket.on(LISTENERS.CREATE_ROOM, (data) =>
          onCreateRoomHandle(data, socket)
        );
        socket.on(LISTENERS.NEW_MESSAGE, (data) =>
          onNewMessageHandle(data, socket)
        );
        socket.on(LISTENERS.ROOM_SELECTED, (data) =>
          onRoomSelectedHandle(data, socket)
        );

        socket.on("disconnect", (reason) => {
          delete ONLINE_USERS[socket.id];
          console.log("Socket Disconnected");
        });
      });
    }
  } catch (error) {
    console.error(
      "Error occurred during socket.io server creation or connection:",
      error
    );
  }

  res.end();
}
