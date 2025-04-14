# Use the official Golang image to build the Go application
FROM golang:1.20 AS builder

# Set the working directory
WORKDIR /app

# Copy the Go modules and source code
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Build the Go application with CGO disabled for a static binary
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Use a lightweight image for the runtime
FROM alpine:latest

# Install certificates for secure connections
RUN apk --no-cache add ca-certificates

# Set the working directory
WORKDIR /root/

# Create a mkdir command inside the Dockerfile to ensure the directory exists
RUN mkdir -p /root

# Copy the built executable from the builder stage
COPY --from=builder /app/main .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./main"]