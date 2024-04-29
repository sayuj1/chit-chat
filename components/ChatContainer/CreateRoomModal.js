import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "/styles/CreateRoomModal.module.css";
import { useChatContext } from "context/ChatContext";

export default function CreateRoomModal() {
  const { onCloseCreateRoomModal, onCreateRoom } = useChatContext();
  const [isBrowser, setIsBrowser] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isMaxLengthErr, setIsMaxLengthErr] = useState(false);
  const [isMinLengthErr, setIsMinLengthErr] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleRoomNameChange = (e) => {
    const inputVal = e.target.value;

    setIsMaxLengthErr(false);
    setIsMinLengthErr(false);
    if (inputVal.length === 0) {
      setIsMaxLengthErr(false);
      setIsMinLengthErr(false);
    } else if (inputVal.length < 3) {
      setIsMinLengthErr(true);
    } else if (inputVal.length > 15) {
      setIsMaxLengthErr(true);
    }

    setRoomName(inputVal);
  };

  const onSubmitRoomName = () => {
    if (roomName && !isMinLengthErr && !isMaxLengthErr) {
      onCreateRoom(roomName.trim());
      onCloseCreateRoomModal();
    }
  };

  let modalUI = isBrowser
    ? ReactDOM.createPortal(
        <dialog id="create_room_modal" className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              onClick={onCloseCreateRoomModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Create Room</h3>
            <p className="py-4">
              <input
                type="text"
                className="input input-bordered w-full"
                id="room-name"
                placeholder="Room Name"
                onChange={handleRoomNameChange}
                value={roomName}
                required
              />
              {isMinLengthErr ? (
                <p className={styles.errorText}>
                  Min. length should be 3 characters
                </p>
              ) : isMaxLengthErr ? (
                <p className={styles.errorText}>
                  Max. length should be less than 15 characters
                </p>
              ) : null}
            </p>
            <div className="modal-action flex justify-center ">
              <form method="dialog">
                <button
                  type="button"
                  className="prim-btn-wide"
                  disabled={!roomName || isMaxLengthErr || isMinLengthErr}
                  onClick={onSubmitRoomName}
                >
                  Create
                </button>
              </form>
            </div>
          </div>

          <form
            method="dialog"
            className="modal-backdrop"
            onClick={onCloseCreateRoomModal}
          >
            <button>close</button>
          </form>
        </dialog>,
        document.getElementById("__container")
      )
    : null;

  return modalUI;
}
