import React, { createContext, useState, useContext, useEffect } from "react";
import io from "socket.io-client";
import { generatedAvatar } from "Utils/AvatarGenerator";
import { LISTENERS, EVENTS } from "Utils/Constants";

let socket;

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(true);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
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
    const theme = localStorage.getItem("theme");
    if (theme) setTheme(theme);
  }, []);

  useEffect(() => {
    socketInit();
    //setting username if exists
    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar");
    if (username && username !== "undefined") {
      setUsername(username);
    }
    if (avatar !== "undefined") {
      setSelectedAvatar(JSON.parse(avatar));
    } else {
      // assign a avatar
      localStorage.setItem("avatar", JSON.stringify(generatedAvatar()[0]));
      setSelectedAvatar(generatedAvatar()[0]);
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
      avatar: selectedAvatar,
    });

    setMessages((currentMessages) => [
      ...currentMessages,
      { author: username, message, avatar: selectedAvatar },
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

  const onCreateUsername = (username) => {
    setUsername(username);
    localStorage.setItem("username", username);

    if (selectedAvatar) {
      localStorage.setItem(
        "avatar",
        JSON.stringify(generatedAvatar()[selectedAvatar])
      );
      setSelectedAvatar(generatedAvatar()[selectedAvatar]);
    } else {
      localStorage.setItem("avatar", JSON.stringify(generatedAvatar()[0]));
      setSelectedAvatar(generatedAvatar()[0]);
    }
  };

  const onCloseCreateUserModal = () => {
    setShowCreateUserModal(false);
  };

  const onShowCreateRoomModal = () => {
    setShowCreateRoomModal(true);
  };

  const onCloseCreateRoomModal = () => {
    setShowCreateRoomModal(false);
  };

  return (
    <ChatContext.Provider
      value={{
        username,
        setUsername,
        onCreateUsername,
        showCreateUserModal,
        onCloseCreateUserModal,
        showCreateRoomModal,
        onShowCreateRoomModal,
        onCloseCreateRoomModal,
        selectedRoom,
        setSelectedRoom,
        roomsList,
        setRoomsList,
        messages,
        setMessages,
        newMessage,
        setNewMessage,
        onSelectRoomHandle,
        onSendMessageHandle,
        onCreateRoom,
        setShowCreateUserModal,
        theme,
        setTheme,
        setSelectedAvatar,
        selectedAvatar,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
