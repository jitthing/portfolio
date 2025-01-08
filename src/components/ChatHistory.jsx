import styled from "styled-components";
import { useEffect, useState } from "react";
const ChatHistoryContainer = styled.div`
    position: fixed;
    background-color: orange;
    bottom: 0;
    right: 0;
    width: 30%;
`

const ChatHistory = () => {

    const [message, setMessage] = useState('')
    const [history, setHistory] = useState([]);
    
    return (
        <>
        <ChatHistoryContainer>
            <div>Live chat</div>
            <div>
                <input type="text" value={message} /*onChange={e => setMessage(e.target.value)}*/ />
                {/* <div>{message}</div> */}
            </div>
            {history.map((msg, index) => {
                return <div key={index}>{msg.body}</div>
            })}
            <button /*onClick={() => {send(message)}}*/>Send</button>
        </ChatHistoryContainer>
        
        </>
    )
}

export default ChatHistory;