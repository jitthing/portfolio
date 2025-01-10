package firebase

import (
	"context"
	"log"
	"os"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/db"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

func InitializeFirebase() *db.Client {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
	ctx := context.Background()
	privateKey := os.Getenv("FIREBASE_PRIVATE_KEY")
	if privateKey == ""  {
		log.Fatalf("FIREBASE_PRIVATE_KEY or DATABASE_URL NOT FOUND")
	}

	sa := option.WithCredentialsJSON([]byte(privateKey))
	app, err := firebase.NewApp(ctx, nil, sa)
	if err != nil {
		log.Fatalln(err)
	}

	dbClient, err := app.Database(ctx)
	if err != nil {
		log.Printf("Error initializing Firebase database client: %v", err)
		return nil
	}
	log.Println("Firebase successfully initialized")
	return dbClient
}
