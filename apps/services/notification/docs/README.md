# Notification service

The Notification Service serves as a crucial communication hub, currently focused on email notifications. It facilitates important updates by sending emails to users, ensuring they are informed about key events and activities within our system.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-notification
```

## Folder structure

```
user/
├─build/    - Packaging and Continuous Integration(dockerfiles etc...).
├─docs/     - Documentation about the service
├─internal/ - Private application and library code.
| ├─app/    - application code
| ├─e2e/    - integration tests
| ├─pkg/    - code that's shared inside the application
├─.env      - Environment variables
```

## Code Examples

To use this service with go

```go
package main

import (
	"context"
	"log"

	"your_protobuf_package/notification" // Import the generated protobuf package
	"google.golang.org/grpc"
)

func main() {
	// Set up a gRPC connection to the Notification Service
	conn, err := grpc.Dial("notification-service-address:port", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create a client for the Notification Service
	client := notification.NewNotificationServiceClient(conn)

	// Compose the notification request
	request := &notification.SendNotificationRequest{
		Title:     "Important Update",
		Content:   "Your order has been shipped!",
		Type:      notification.NotificationType_EMAIL,
		Recipient: "user@example.com",
	}

	// Send the notification
	response, err := client.SendNotification(context.Background(), request)
	if err != nil {
		log.Fatalf("Failed to send notification: %v", err)
	}

	log.Printf("Notification sent successfully. ID: %s", response.Id)
}
```
