import React, { useState, useEffect } from "react";
import AvatarList from "./AvatarList";
import { useChatContext } from "context/ChatContext";
import { generatedAvatar } from "Utils/AvatarGenerator";

export default function ChangeAvatar() {
  const { setSelectedAvatar } = useChatContext();
  const [currAvatar, setCurrAvatar] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  const closeChangeAvatarModal = () => {
    setCurrAvatar("");
  };

  const handleAvatarSelection = (idx) => {
    setCurrAvatar(idx);
  };

  const handleUpdateAvatar = () => {
    localStorage.setItem(
      "avatar",
      JSON.stringify(generatedAvatar()[currAvatar])
    );
    setSelectedAvatar(generatedAvatar()[currAvatar]);
    document.getElementById("change_avatar_modal").close();
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  let modalUI = isBrowser ? (
    <dialog id="change_avatar_modal" className="modal">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Choose Avatar</h3>
        <p className="py-4">
          <AvatarList
            selectorFunc={handleAvatarSelection}
            currAvatar={currAvatar}
            setCurrAvatar={setCurrAvatar}
            type="Change_Avatar"
          />
        </p>
        <div className="modal-action flex justify-center ">
          <form method="dialog">
            <button
              type="button"
              className="prim-btn-wide"
              onClick={handleUpdateAvatar}
            >
              Update Avatar
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeChangeAvatarModal}>close</button>
      </form>
    </dialog>
  ) : null;
  return modalUI;
}
