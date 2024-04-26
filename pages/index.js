import ChatContainer from "components/ChatContainer/ChatContainer";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { LISTENERS, EVENTS } from "Utils/Constants";

let socket;
export default function Home() {
  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [roomsList, setRoomsList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);

  const socketInit = async () => {
    await fetch("/api/socket");
    socket = io();

    // setting up listeners
    socket.on(LISTENERS.CREATE_ROOM_RESPONSE, onCreateRoomResponseHandle);
    socket.on(LISTENERS.ALL_ROOMS_LIST, onAllRoomResponseHandle);
    socket.on(LISTENERS.NEW_MESSAGE_RESPONSE, onNewMessageResponseHandle);
  };

  useEffect(() => {
    socketInit();
    //setting username if exists
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }

    return () => {
      if (socket) {
        socket.off(LISTENERS.ALL_ROOMS_LIST);
        socket.off(LISTENERS.CREATE_ROOM_RESPONSE);
        socket.off(LISTENERS.NEW_MESSAGE_RESPONSE);
      }
    };
  }, []);

  useEffect(() => {
    if (newMessage && roomsList) {
      let updatedRoomsList = [...roomsList];
      updatedRoomsList = updatedRoomsList.filter(
        (room) => room.name !== newMessage.name
      );
      updatedRoomsList = [...updatedRoomsList, { ...newMessage }];
      onUpdateRoomsList(updatedRoomsList);
      setNewMessage(null);
    }
  }, [newMessage]);

  useEffect(() => {
    onUpdateRoomsMessages();
  }, [roomsList]);

  const onCreateRoomResponseHandle = (data) => {
    if (data) {
      setSelectedRoom(data);
    }
  };

  const onAllRoomResponseHandle = (data) => {
    onUpdateRoomsList(data);
  };

  const onUpdateRoomsList = (roomsList) => {
    const updateRoomsList = roomsList.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setRoomsList(updateRoomsList);
  };

  const onNewMessageResponseHandle = (data) => {
    setNewMessage(data);
  };

  const onCreateUsername = (username) => {
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const onSelectRoomHandle = (roomName) => {
    if (roomName) {
      setSelectedRoom(roomName);
      socket.emit(EVENTS.ROOM_SELECTED, roomName);
    }
  };

  const onCreateRoom = (roomName) => {
    socket.emit(EVENTS.CREATE_ROOM, { roomName, username });
    onSelectRoomHandle(roomName);
  };

  const onSendMessageHandle = (message) => {
    if (!username || !selectedRoom || roomsList.length === 0) return;
    socket.emit(EVENTS.NEW_MESSAGE, {
      author: username,
      message: message,
      room: selectedRoom,
    });

    setMessages((currentMessages) => [
      ...currentMessages,
      { author: username, message },
    ]);
  };

  const onUpdateRoomsMessages = () => {
    let updatedRoomsList = [...roomsList];
    let updatedRoom = updatedRoomsList.find(
      (room) => room.name === selectedRoom
    );

    if (updatedRoom) {
      const updatedMessages = updatedRoom.messages;
      setMessages(updatedMessages);
    }
  };
  return (
    <>
      <Head>
        <title>Chit-Chat</title>
      </Head>
      <ChatContainer
        username={username}
        onCreateUsername={onCreateUsername}
        selectedRoom={selectedRoom}
        onCreateRoom={onCreateRoom}
        roomsList={roomsList}
        onSelectRoomHandle={onSelectRoomHandle}
        onSendMessageHandle={onSendMessageHandle}
        messages={messages}
      />
    </>
  );
}
