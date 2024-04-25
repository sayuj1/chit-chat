import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "/styles/CreateUserModal.module.css";

export default function CreateUserModal({
  onCloseCreateUserModal,
  onCreateUsername,
}) {
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
        <div className="modal d-block">
          <div className={styles.Backdrop}></div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create User</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onCloseCreateUserModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      (isMinLengthErr || isMaxLengthErr) && "is-invalid"
                    }`}
                    id="floatingInput"
                    value={username}
                    onChange={handleInputChange}
                    placeholder="username"
                    required
                  />
                  <label htmlFor="floatingInput">Username</label>
                  {isMinLengthErr ? (
                    <div className="invalid-feedback">
                      Min. length should be 3 characters
                    </div>
                  ) : isMaxLengthErr ? (
                    <div className="invalid-feedback">
                      Max. length should be less than 15 characters
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={!username || isMaxLengthErr || isMinLengthErr}
                  onClick={handleSubmit}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("__next")
      )
    : null;
  return modalUI;
}
