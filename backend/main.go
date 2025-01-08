package main

import (
	"chat-backend/firebase"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true // allow all origins for simplicity
		},
	}
	clients = make(map[*websocket.Conn]bool)
	lock    = sync.Mutex{}
)

func main() {
	// Initialize Firebase first
	fbClient := firebase.InitializeFirebase()
	if fbClient == nil {
		log.Fatal("Failed to initialise firebase")
	}

	http.HandleFunc("/ws", handleWebSocket)
	log.Println("Server started on PORT 8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed %v", err)
	}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade to websocket: %v", err)
		return
	}
	defer conn.Close()
	log.Println("Client connected")

	lock.Lock()
	clients[conn] = true
	lock.Unlock()

	defer func() {
		lock.Lock()
		delete(clients, conn)
		lock.Unlock()
		conn.Close()
		log.Println("Client Disconnected")
	}()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Printf("Error reading message: %v", err)
			break
		}
		log.Printf("Broacasting message: %v", message)

		broadcastMessage(messageType, message)
	}

}

func broadcastMessage(messageType int, message []byte) {
	lock.Lock()
	defer lock.Unlock()

	for client := range clients {
		if err := client.WriteMessage(messageType, message); err != nil {
			log.Printf("Error sending message: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}
