import React, { useState } from "react";
import styles from "/styles/ChatBoxContainer.module.css";
import MessageBox from "./MessageBox";

export default function ChatBoxContainer({
  username,
  onSendMessageHandle,
  messages,
}) {
  const [message, setMessage] = useState("");

  const handleInputMessage = (e) => {
    const messageVal = e.target.value;
    setMessage(messageVal);
  };

  const handleSendMessage = () => {
    if (message) onSendMessageHandle(message.trim());
    setMessage("");
  };

  return (
    <div
      className={`${styles.ChatBoxContainer} d-flex flex-column justify-content-between pb-0`}
    >
      <div className={`scroll px-4 ${styles.ChatBoxWrapper}`}>
        {messages.map((message, messageIdx) => (
          <MessageBox
            key={messageIdx}
            username={username}
            name={message.author}
            message={message.message}
          />
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <input
          type="text"
          className={`ps-2 ${styles.MessageInput}`}
          placeholder="Type your message..."
          value={message}
          onChange={handleInputMessage}
        />
        <div className="d-flex justify-content-center pe-3">
          <button
            className="btn btn-success"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
