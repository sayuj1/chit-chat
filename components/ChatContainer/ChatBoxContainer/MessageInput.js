import { useChatContext } from "context/ChatContext";
import React, { useState } from "react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const { onSendMessageHandle } = useChatContext();
  const handleInputMessage = (e) => {
    const messageVal = e.target.value;
    setMessage(messageVal);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) onSendMessageHandle(message.trim());
    setMessage("");
  };
  return (
    <>
      <textarea
        placeholder="Type your message..."
        className="textarea w-full resize-none rounded-md bg-base-300 p-2"
        value={message}
        onChange={handleInputMessage}
      />
      <button
        type="submit"
        className="prim-btn-wide"
        onClick={handleSendMessage}
      >
        Send
      </button>
    </>
  );
}
