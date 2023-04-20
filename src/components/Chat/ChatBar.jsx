import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

    const handleLeaveChat = () => {
      localStorage.removeItem("userName");
      navigate("/");
      window.location.reload();
    };

  return (
    <div className="chat-bar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat-header">ACTIVE USERS</h4>
        <div className="chat-users">
          {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
        <button className="leaveChat" onClick={handleLeaveChat}>Leave</button>
      </div>
    </div>
  );
};

export default ChatBar;
