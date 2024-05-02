import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ChatHeader from "components/ChatHeader";
import { useChatContext } from "context/ChatContext";
import MessageInput from "./ChatBoxContainer/MessageInput";
import MessageBox from "./ChatBoxContainer/MessageBox";
const CreateUserModal = dynamic(() => import("./CreateUserModal"));
const CreateRoomModal = dynamic(() => import("./CreateRoomModal"));

export default function ChatContainer() {
  const { showCreateRoomModal, showCreateUserModal, username, messages } =
    useChatContext();

  const [isUsernameExists, setIsUsernameExists] = useState(true);

  useEffect(() => {
    if (localStorage && localStorage.getItem("username")) {
      setIsUsernameExists(true);
    } else {
      setIsUsernameExists(false);
    }
  }, []);

  let createUserModalUI = <CreateUserModal />;

  let createRoomModalUI = <CreateRoomModal />;

  return (
    <>
      <div className="flex flex-col overflow-hidden ">
        <ChatHeader />
        <div className="flex-1 overflow-scroll px-4 py-2">
          {messages.map((message, messageIdx) => (
            <MessageBox
              key={messageIdx}
              username={username}
              name={message.author}
              message={message.message}
              avatar={message.avatar}
            />
          ))}
        </div>
        <footer className="border-t-[1px] border-slate-500 p-5">
          <form>
            <fieldset className="flex gap-2">
              <MessageInput />
            </fieldset>
          </form>
        </footer>
      </div>

      {showCreateUserModal && !isUsernameExists ? createUserModalUI : null}
      {showCreateRoomModal && createRoomModalUI}
    </>
  );
}
