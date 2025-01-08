package firebase

import (
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

func InitializeFirebase() *firebase.App {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	ctx := context.Background()
	privateKey := os.Getenv("FIREBASE_PRIVATE_KEY")
	if privateKey == "" {
		log.Fatalf("FIREBASE_PRIVATE_KEY NOT FOUND")
	}

	sa := option.WithCredentialsJSON([]byte(privateKey))
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}
	log.Println("Firebase successfully initialized")
	return app
}
