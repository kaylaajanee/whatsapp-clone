import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5000");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => socket.off("message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear auth tokens or session)
    navigate("/login");
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p>{msg}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
