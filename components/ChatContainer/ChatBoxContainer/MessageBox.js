import React from "react";
import Avatar from "react-nice-avatar";

export default function MessageBox({ username, name, message, avatar }) {
  return (
    <div className={`chat ${username === name ? "chat-end" : "chat-start"}`}>
      <div className="avatar chat-image">
        <Avatar style={{ width: "4.5rem", height: "4.5rem" }} {...avatar} />
      </div>
      <div className="chat-header">{name}</div>
      <div className="chat-bubble">{message}</div>
    </div>
  );
}
