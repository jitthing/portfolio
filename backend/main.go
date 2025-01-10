package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"chat-backend/firebase"

	"firebase.google.com/go/db"
	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true // Allow all origins for simplicity; adjust for security in production
		},
	}

	// Clients map to store connected WebSocket clients
	clients = make(map[*websocket.Conn]bool)
	lock    = sync.Mutex{} // To protect the clients map

	// Struct for user messages
	userMessageStruct = struct {
		User    string `json:"user"`
		Content string `json:"content"`
	}{}
)

// List of disallowed words
var disallowedWords = []string{"badword1", "badword2", "curseword"} // Add more words as needed

func main() {
	// Initialize Firebase
	fbClient := firebase.InitializeFirebase()
	if fbClient == nil {
		log.Fatalf("Failed to initialize Firebase")
	}

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		handleWebSocket(w, r, fbClient)
	})

	http.HandleFunc("/history", func(w http.ResponseWriter, r *http.Request) {
		fetchChatHistory(w, r, fbClient)
	})

	log.Println("Server started on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func handleWebSocket(w http.ResponseWriter, r *http.Request, fbClient *db.Client) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Failed to upgrade to WebSocket: %v", err)
		return
	}
	
	log.Println("Client connected")

	// Add the new client to the clients map
	lock.Lock()
	clients[conn] = true
	lock.Unlock()

	// Ensure the connection is cleaned up on disconnect
	defer func() {
		lock.Lock()
		delete(clients, conn)
		lock.Unlock()
		conn.Close()
		log.Println("Client disconnected")
	}()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Printf("Error reading message: %v", err)
			break
		}

		var userMessage = userMessageStruct
		if err := json.Unmarshal(message, &userMessage); err != nil {
			log.Printf("Error parsing message JSON: %v", err)
			continue
		}

		// Filter message for disallowed words
		userMessage.Content = filterMessage(userMessage.Content)

		log.Printf("Broadcasting message: %s", userMessage.Content)

		// Save message to Firebase
		if _, err := saveMessageToFirebase(fbClient, userMessage); err != nil {
			log.Printf("Error saving message to Firebase: %v", err)
		}

		// Broadcast the message to all connected clients
		broadcastMessage(messageType, message)
	}
}

func saveMessageToFirebase(fbClient *db.Client, message struct {
	User    string `json:"user"`
	Content string `json:"content"`
}) (*db.Ref, error) {
	msg := map[string]interface{}{
		"user":      message.User,
		"content":   message.Content,
		"timestamp": time.Now().Unix(),
	}

	return fbClient.NewRef("/chat/messages").Push(context.Background(), msg)
}

func fetchChatHistory(w http.ResponseWriter, r *http.Request, fbClient *db.Client) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var messages []map[string]interface{}
	err := fbClient.NewRef("/chat/messages").Get(context.Background(), &messages)
	if err != nil {
		log.Printf("Error fetching chat history: %v", err)
		http.Error(w, "Failed to fetch chat history", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(messages); err != nil {
		log.Printf("Error encoding chat history: %v", err)
		http.Error(w, "Failed to encode chat history", http.StatusInternalServerError)
	}
}

func broadcastMessage(messageType int, message []byte) {
	lock.Lock()
	defer lock.Unlock()

	for client := range clients {
		if err := client.WriteMessage(messageType, message); err != nil {
			log.Printf("Error sending message to client: %v", err)
			client.Close()
			delete(clients, client)
		}
	}
}

// filterMessage filters out disallowed words from a message
func filterMessage(message string) string {
	for _, word := range disallowedWords {
		if strings.Contains(strings.ToLower(message), strings.ToLower(word)) {
			message = strings.ReplaceAll(strings.ToLower(message), strings.ToLower(word), "***")
		}
	}
	return message
}
