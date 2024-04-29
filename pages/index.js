import ChatContainer from "components/ChatContainer/ChatContainer";
import ChatSidebar from "components/ChatSidebar";
import { useChatContext } from "context/ChatContext";
import Head from "next/head";
import React from "react";

export default function Home() {
  const { theme } = useChatContext();

  return (
    <>
      <div data-theme={theme} id="__container">
        <Head>
          <title>Chit-Chat</title>
        </Head>
        <div className="grid h-screen grid-cols-[260px_1fr]">
          <ChatSidebar />
          <ChatContainer />
        </div>
      </div>
    </>
  );
}
