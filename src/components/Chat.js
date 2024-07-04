// src/components/Chat.js
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Message from "./Message";

const socket = io("http://localhost:5000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { username, room, token } = location.state;

  useEffect(() => {
    socket.emit("joinRoom", { username, room });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("chatHistory", (chatHistory) => {
      setMessages(chatHistory);
    });

    return () => {
      socket.off("message");
      socket.off("chatHistory");
    };
  }, [username, room]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("chatMessage", message);
      setMessage("");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <button onClick={handleLogout} className="btn">
          Leave Room
        </button>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">{room}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users"></ul>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <Message key={index} user={msg.username} text={msg.text} timestamp={msg.time} />
          ))}
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={sendMessage}>
          <input id="msg" type="text" placeholder="Enter Message" required value={message} onChange={(e) => setMessage(e.target.value)} />
          <button type="submit" className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
