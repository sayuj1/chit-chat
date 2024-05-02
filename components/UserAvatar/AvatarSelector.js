import React, { useState } from "react";
import AvatarList from "./AvatarList";
import { useChatContext } from "context/ChatContext";

export default function AvatarSelector() {
  const { setSelectedAvatar } = useChatContext();
  const handleAvatarSelection = (idx) => {
    setSelectedAvatar(idx);
  };

  return <AvatarList selectorFunc={handleAvatarSelection} />;
}
