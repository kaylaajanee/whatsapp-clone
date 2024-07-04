import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    navigate("/chat", { state: { username, room } });
  };

  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleJoin}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <input type="text" id="room" required value={room} onChange={(e) => setRoom(e.target.value)} />
          </div>
          <button type="submit" className="btn">
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
}

export default Join;
