import React from "react";
import RoomContainer from "./RoomContainer/RoomContainer";
import { useChatContext } from "context/ChatContext";
import styles from "/styles/ChatSidebar.module.css";

export default function ChatSidebar() {
  const {
    onShowCreateRoomModal,
    setUsername,
    setShowCreateUserModal,
    setSelectedAvatar,
  } = useChatContext();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    setSelectedAvatar({});
    setUsername("");
    setShowCreateUserModal(true);
  };

  return (
    <div className="flex flex-col overflow-hidden border-r-[1px] border-slate-500 bg-base-100">
      <div className="flex justify-center border-b-[1px] border-slate-500 px-4 py-5">
        <div id={styles.container} onClick={onShowCreateRoomModal}>
          <button className={styles.btn}>
            <span className={styles.circle}>
              <span className={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span className={styles.buttontext}>Create Room</span>
          </button>
        </div>
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
