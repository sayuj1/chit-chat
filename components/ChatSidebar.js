import React from "react";
import RoomContainer from "./ChatContainer/RoomContainer/RoomContainer";
import { useChatContext } from "context/ChatContext";

export default function ChatSidebar() {
  const { onShowCreateRoomModal, setUsername, setShowCreateUserModal } =
    useChatContext();

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setShowCreateUserModal(true);
  };

  return (
    <div className="flex flex-col overflow-hidden border-r-[1px] border-slate-500 bg-base-100">
      <div className="flex justify-center border-b-[1px] border-slate-500 px-4 py-5">
        <button
          type="button"
          className="prim-btn-block"
          onClick={onShowCreateRoomModal}
        >
          Create Room
        </button>
      </div>
      <div className="px-4 py-4 text-center">
        <span className="mb-0 py-1 text-3xl">Rooms</span>
      </div>
      <RoomContainer />
      <div className="flex justify-center border-b-[1px] border-slate-500 px-4 py-5">
        <button type="button" className="prim-btn-block" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
