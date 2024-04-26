import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RoomContainer from "./RoomContainer/RoomContainer";
import ChatBoxContainer from "./ChatBoxContainer/ChatBoxContainer";
const CreateUserModal = dynamic(() => import("./CreateUserModal"));
const CreateRoomModal = dynamic(() => import("./CreateRoomModal"));

export default function ChatContainer({
  onCreateUsername,
  username,
  selectedRoom,
  onCreateRoom,
  roomsList,
  onSelectRoomHandle,
  onSendMessageHandle,
  messages,
}) {
  // by default asking user to enter credentials
  const [showCreateUserModal, setShowCreateUserModal] = useState(true);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [isUsernameExists, setIsUsernameExists] = useState(true);

  useEffect(() => {
    if (localStorage && localStorage.getItem("username")) {
      setIsUsernameExists(true);
    } else {
      setIsUsernameExists(false);
    }
  }, []);

  const onCloseCreateUserModal = () => {
    setShowCreateUserModal(false);
  };

  const onShowCreateRoomModal = () => {
    setShowCreateRoomModal(true);
  };

  const onCloseCreateRoomModal = () => {
    setShowCreateRoomModal(false);
  };

  let createUserModalUI = (
    <CreateUserModal
      onCloseCreateUserModal={onCloseCreateUserModal}
      onCreateUsername={onCreateUsername}
    />
  );

  let createRoomModalUI = (
    <CreateRoomModal
      onCloseCreateRoomModal={onCloseCreateRoomModal}
      onCreateRoom={onCreateRoom}
    />
  );

  let headerUI = (
    <header className="text-center">
      <h1 className="display-4">Chit-Chat</h1>
      <p className="lead mb-2">Chit-Chat with your friends!</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={onShowCreateRoomModal}
      >
        Create Room
      </button>
    </header>
  );
  return (
    <>
      <div className="px-4 py-5">
        {headerUI}
        <div className="row mt-5 overflow-hidden shadow">
          <div className="col-5 px-0">
            <RoomContainer
              selectedRoom={selectedRoom}
              roomsList={roomsList}
              onSelectRoomHandle={onSelectRoomHandle}
            />
          </div>
          <div className="col-7 px-0">
            <ChatBoxContainer
              username={username}
              onSendMessageHandle={onSendMessageHandle}
              messages={messages}
            />
          </div>
        </div>
      </div>

      {showCreateUserModal && !isUsernameExists ? createUserModalUI : null}
      {showCreateRoomModal && createRoomModalUI}
    </>
  );
}
