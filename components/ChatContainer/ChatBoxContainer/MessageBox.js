import React from "react";

export default function MessageBox({ username, name, message }) {
  return (
    <div className={`chat ${username === name ? "chat-end" : "chat-start"}`}>
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-header">{name}</div>
      <div className="chat-bubble">{message}</div>
    </div>
  );
}
