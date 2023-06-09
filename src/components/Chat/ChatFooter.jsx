import React, { useState } from "react";

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState("");

const handleSendMessage = (e) => {
  e.preventDefault();
  if (message.trim() && localStorage.getItem("userName")) {
    socket.emit("message", {
      text: message,
      name: localStorage.getItem("userName"),
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
  }
  setMessage("");
};
  return (
    <div className="chat-footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage} className="sendBtn">Send</button>
      </form>
    </div>
  );
};

export default ChatFooter;
