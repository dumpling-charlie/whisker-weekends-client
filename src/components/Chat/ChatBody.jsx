import React from "react";

const ChatBody = ({ messages }) => {

  return (
    <>
      <div className="message-container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message-chats" key={message.id}>
              <p className="sender-name">You</p>
              <div className="message-sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message-chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message-recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

      </div>
    </>
  );
};

export default ChatBody;
