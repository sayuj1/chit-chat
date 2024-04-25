import ChatContainer from "components/ChatContainer/ChatContainer";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;
export default function Home() {
  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const socketInit = async () => {
    await fetch("/api/socket");
    socket = io();

    // const socket = io({
    //   path: "/api/socket",
    //   addTrailingSlash: false,
    // });

    // socket.on("connect", () => {
    //   console.log("Connected");
    // });

    // socket.on("disconnect", () => {
    //   console.log("Disconnected");
    // });

    // socket.on("connect_error", async (err) => {
    //   console.log(`connect_error due to ${err.message}`);
    //   await fetch("/api/socket");
    // });
  };

  useEffect(() => {
    socketInit();
    //setting username if exists
    const username = localStorage.getItem('username')
    if (username) {
      setUsername(username)
    }
  }, []);

  const onCreateUsername = (username) => {
    setUsername(username);
    localStorage.setItem('username', username)
  };

  const onCreateRoom = (roomName) =>{
    setSelectedRoom(roomName)
  }
  return (
    <>
      <Head>
        <title>Chit-Chat</title>
      </Head>
      <ChatContainer username={username} onCreateUsername={onCreateUsername} selectedRoom={selectedRoom} onCreateRoom={onCreateRoom}/>
    </>
  );
}
