package websocket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
}

type BroadcastMessage struct {
	Message Message
	Sender  *Client
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println("Error reading message:", err)
			return
		}

		message := Message{Type: messageType, Body: string(p)}
		// Create a broadcast message that includes the sender information
		broadcastMsg := BroadcastMessage{
			Message: message,
			Sender:  c,
		}

		// Send to the broadcast channel
		c.Pool.Broadcast <- broadcastMsg
		fmt.Printf("Message Received: %+v\n", message)
	}
}
