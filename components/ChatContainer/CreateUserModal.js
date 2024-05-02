import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "/styles/CreateUserModal.module.css";
import { useChatContext } from "context/ChatContext";
import AvatarSelector from "components/UserAvatar/AvatarSelector";

export default function CreateUserModal() {
  const { onCloseCreateUserModal, onCreateUsername } = useChatContext();
  const [isBrowser, setIsBrowser] = useState(false);
  const [username, setUsername] = useState("");
  const [isMaxLengthErr, setIsMaxLengthErr] = useState(false);
  const [isMinLengthErr, setIsMinLengthErr] = useState(false);

  const handleInputChange = (e) => {
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

    setUsername(inputVal);
  };

  const handleSubmit = () => {
    if (username && !isMaxLengthErr && !isMinLengthErr) {
      onCreateUsername(username.trim());
      onCloseCreateUserModal();
      setUsername("");
      setIsMaxLengthErr(false);
      setIsMinLengthErr(false);
    }
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  let modalUI = isBrowser
    ? ReactDOM.createPortal(
        <dialog id="create_user_modal" className="modal modal-open">
          <div className="modal-box">
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              onClick={onCloseCreateUserModal}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold">Create User</h3>
            <p className="py-4">
              <AvatarSelector />
            </p>
            <p className="py-4">
              <input
                type="text"
                className="input input-bordered w-full"
                id="floatingInput"
                value={username}
                onChange={handleInputChange}
                placeholder="username"
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
                  disabled={!username || isMaxLengthErr || isMinLengthErr}
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </form>
            </div>
          </div>

          <form
            method="dialog"
            className="modal-backdrop"
            onClick={onCloseCreateUserModal}
          >
            <button>close</button>
          </form>
        </dialog>,
        document.getElementById("__container")
      )
    : null;
  return modalUI;
}
