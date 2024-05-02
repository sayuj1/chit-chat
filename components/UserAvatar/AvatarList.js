import { generatedAvatar } from "Utils/AvatarGenerator";
import { useChatContext } from "context/ChatContext";
import React, { useEffect } from "react";
import Avatar from "react-nice-avatar";

export default function AvatarList({ selectorFunc, ...rest }) {
  const { selectedAvatar } = useChatContext();
  const avatars = generatedAvatar();

  if (rest?.currAvatar === -1 || rest?.currAvatar === "") {
    // find selected avatar
    if (rest?.type === "Change_Avatar") {
      // find index from generatedAvatar of selectedAvatar
      const index = avatars.findIndex(
        (avatar) => JSON.stringify(avatar) === JSON.stringify(selectedAvatar)
      );
      rest?.setCurrAvatar(index);
    }
  }

  return (
    <div className=" h-[160px] w-[100%] overflow-scroll">
      <div className="flex flex-wrap justify-center gap-3 px-5 py-2">
        {avatars.map((config, idx) => (
          <div onClick={() => selectorFunc(idx)} key={idx}>
            <Avatar
              style={{ width: "4rem", height: "4rem" }}
              {...config}
              className={`${
                rest?.currAvatar === idx ? "border-4 border-cyan-600" : ""
              } ${
                selectedAvatar === idx ? "border-4 border-cyan-600" : ""
              } cursor-pointer `}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
