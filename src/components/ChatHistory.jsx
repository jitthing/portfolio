import styled from "styled-components";
import { useEffect, useState } from "react";
import { connect, sendMsg } from "../api/index.js";
const ChatHistoryContainer = styled.div`
  position: fixed;
  background-color: orange;
  bottom: 0;
  right: 0;
  width: 30%;
`;

const ChatHistory = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const socket = connect((msg) => {
      setHistory((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMsg(message);
      setMessage("");
    }
  };

  return (
    <>
      <ChatHistoryContainer>
        <div>Live chat</div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <div>Curr message: {message}</div> */}
        </div>
        {history.map((msg, index) => {
          return <div key={index}>{msg.data}</div>;
        })}
        <button onClick={handleSendMessage}>Send</button>
      </ChatHistoryContainer>
    </>
  );
};

export default ChatHistory;
