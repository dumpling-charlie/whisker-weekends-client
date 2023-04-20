import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatHome = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    //sends the username and socket ID to the Node.js server
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat/live");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Find other pet parents to chat with</h2>
      <label htmlFor="username">Screen-name</label>
      <input
        type="text"
        minLength={3}
        name="username"
        id="username"
        className="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit" className="start-chat">
        Start chatting
      </button>
    </form>
  );
};

export default ChatHome;
