import styled from "styled-components";
import { connect, sendMsg } from "../api";
import { useState, useEffect, useRef } from "react";

const ChatHistoryContainer = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: ${props => props.isCollapsed ? '60px' : '320px'};
    height: ${props => props.isCollapsed ? '60px' : '450px'};
    border-radius: ${props => props.isCollapsed ? '50%' : '12px'};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: ${props => props.isCollapsed ? '#4A154B' : '#fff'};
    z-index: 1000;
    transition: all 0.3s ease;
`

const ChatHeader = styled.div`
    padding: 15px;
    background-color: #4A154B;
    color: white;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
`

const MessagesContainer = styled.div`
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const MessageInput = styled.div`
    display: flex;
    padding: 10px;
    background-color: white;
    border-top: 1px solid #e0e0e0;
`

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
        outline: none;
        border-color: #4A154B;
    }
`

const SendButton = styled.button`
    margin-left: 10px;
    padding: 10px 15px;
    background-color: #4A154B;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    &:hover {
        background-color: #611f69;
    }
`

const Message = styled.div`
    padding: 10px 15px;
    border-radius: 18px;
    max-width: 80%;
    word-wrap: break-word;
    background-color: ${props => props.isUser ? '#4A154B' : '#e0e0e0'};
    color: ${props => props.isUser ? 'white' : 'black'};
    align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    margin-bottom: 5px;
`

const CollapsedButton = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #4A154B;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    right: 20px;
`

export const ChatHistory = () => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const messagesEndRef = useRef(null);
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    
    useEffect(() => {
        // When component mounts, set up the connection
        connect((msg) => {
            try {
                console.log("Raw message received:", msg);
                // Parse the message data properly
                const data = JSON.parse(msg.data);
                console.log("Parsed message:", data);
                
                // Handle different message formats
                let messageText = "";
                if (typeof data === 'string') {
                    messageText = data;
                } else if (data.Body !== undefined) {
                    messageText = data.Body;
                } else if (data.body !== undefined) {
                    messageText = data.body;
                } else {
                    messageText = JSON.stringify(data);
                }
                
                // Add the received message to history
                setHistory(prevHistory => [...prevHistory, {
                    text: messageText,
                    isUser: false
                }]);
            } catch (error) {
                console.error("Error processing message:", error);
                console.error("Message content:", msg.data);
                // Try to display the raw message if parsing fails
                if (msg.data) {
                    setHistory(prevHistory => [...prevHistory, {
                        text: typeof msg.data === 'string' ? msg.data : "Received message (could not parse)",
                        isUser: false
                    }]);
                }
            }
        });
    }, []);
    
    useEffect(() => {
        scrollToBottom();
    }, [history]);
    
    const send = (msg) => {
        if (msg.trim() === '') return;
        
        console.log("Sending message:", msg);
        // Add the sent message to history
        setHistory(prevHistory => [...prevHistory, {
            text: msg,
            isUser: true
        }]);
        sendMsg(msg);
        setMessage('');
    }
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            send(message);
        }
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
        // If expanding the chat, wait a bit before scrolling to bottom
        if (isCollapsed) {
            setTimeout(scrollToBottom, 300);
        }
    }

    if (isCollapsed) {
        return (
            <CollapsedButton onClick={toggleCollapse}>
                💬
            </CollapsedButton>
        );
    }

    return (
        <ChatHistoryContainer isCollapsed={isCollapsed}>
            <ChatHeader onClick={toggleCollapse}>
                Chat
                <span>{isCollapsed ? '💬' : '✖'}</span>
            </ChatHeader>
            <MessagesContainer>
                {history.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
                        No messages yet. Start chatting!
                    </div>
                ) : (
                    history.map((msg, index) => (
                        <Message key={index} isUser={msg.isUser}>
                            {msg.text}
                        </Message>
                    ))
                )}
                <div ref={messagesEndRef} />
            </MessagesContainer>
            <MessageInput>
                <Input 
                    type="text" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    placeholder="Type a message..."
                    onKeyPress={handleKeyPress}
                />
                <SendButton onClick={() => send(message)}>Send</SendButton>
            </MessageInput>
        </ChatHistoryContainer>
    )
}

export default ChatHistory;
