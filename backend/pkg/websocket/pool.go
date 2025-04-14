package websocket

import (
	"fmt"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan BroadcastMessage
}

// BroadcastMessage contains the message and the client that sent it
// type BroadcastMessage struct {
// 	Message Message
// 	Sender  *Client
// }

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan BroadcastMessage),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client := range pool.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client := range pool.Clients {
				client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			}
			break
		case broadcastMsg := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool except sender")
			for client := range pool.Clients {
				// Skip sending the message back to the client who sent it
				if client == broadcastMsg.Sender {
					continue
				}

				if err := client.Conn.WriteJSON(broadcastMsg.Message); err != nil {
					fmt.Println(err)
					continue
				}
			}
		}
	}
}
