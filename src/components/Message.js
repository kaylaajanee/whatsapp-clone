import React from "react";

function Message({ user, text, timestamp }) {
  return (
    <div className="message">
      <p>
        <strong>{user}</strong>: {text}
      </p>
      <span>{timestamp}</span>
    </div>
  );
}

export default Message;
