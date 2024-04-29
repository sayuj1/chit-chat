import React from "react";
import ThemeSelector from "./ThemeSelector";

export default function ChatHeader() {
  return (
    <>
      <div className="card rounded-none border-b-[1px] border-slate-500 bg-base-100 py-[6px] ">
        <div className="card-body flex flex-row justify-between">
          <h2 className="card-title flex justify-center">Chit-Chat</h2>
          <ThemeSelector />
        </div>
      </div>
    </>
  );
}
