import React from "react";
import Room from "./Room/Room";
import { useChatContext } from "context/ChatContext";

export default function RoomContainer() {
  const { roomsList, selectedRoom, onSelectRoomHandle } = useChatContext();
  return (
    <div className="flex-1 overflow-auto">
      {roomsList.map((room, roomIdx) => (
        <Room
          key={roomIdx}
          name={room.name}
          createdAt={room.createdAt}
          isRoomSelected={room.name === selectedRoom}
          onSelectRoomHandle={onSelectRoomHandle}
        />
      ))}
    </div>
  );
}
