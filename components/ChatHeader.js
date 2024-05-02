"use client";
import React, { useEffect, useState } from "react";
import ThemeSelector from "./ThemeSelector";
import { useChatContext } from "context/ChatContext";
import Avatar from "react-nice-avatar";
import ChangeAvatar from "./UserAvatar/ChangeAvatar";

export default function ChatHeader() {
  const { selectedAvatar } = useChatContext();
  const [isClient, setIsClient] = useState(false);

  const openChangeAvatarModal = () => {
    document.getElementById("change_avatar_modal").showModal();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="card rounded-none border-b-[1px] border-slate-500 bg-base-100">
        <div className="card-body flex flex-row justify-between py-[16px]">
          <h2 className="card-title">Chit-Chat</h2>
          {isClient && (
            <div className="flex flex-wrap items-center">
              <ThemeSelector />
              <div onClick={openChangeAvatarModal}>
                <Avatar
                  style={{ width: "3rem", height: "3rem" }}
                  {...selectedAvatar}
                  className="cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <ChangeAvatar />
    </>
  );
}
