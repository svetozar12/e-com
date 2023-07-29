# User service

Performs crud operations on user entity and is used for authentication. Currently the user service in responsible for authentication and user operations.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-user
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

	"google.golang.org/grpc"
	pb "your_package_name/userpb"                // Replace "your_package_name" with the actual package name for your User Service protobuf definitions
	authpb "your_package_name/authenticationpb"  // Replace "your_package_name" with the actual package name for your Authentication Service protobuf definitions
)

func main() {
	// Set up a connection to the User Service server.
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to User Service: %v", err)
	}
	defer conn.Close()

	// Create a User Service client.
	userClient := pb.NewUserServiceClient(conn)

	// Example 1: Get user information by ID
	userID := 123

	// Call the GetUser RPC method to retrieve user information.
	getUserResponse, err := userClient.GetUser(context.Background(), &pb.GetUserRequest{
		Id: userID,
	})
	if err != nil {
		log.Fatalf("Failed to get user information for UserID %d: %v", userID, err)
	}

	user := getUserResponse.GetUser()
	log.Printf("User Information for UserID %d:\nEmail: %s\nFirst Name: %s\nLast Name: %s",
		user.Id, user.Email, user.Fname, user.Lname)

	// Example 2: Update user information
	updateUserRequest := &pb.UpdateUserRequest{
		Id:    userID,
		Email: "updated_email@example.com",
		Fname: "Updated",
		Lname: "User",
	}

	// Call the UpdateUser RPC method to update user information.
	updateUserResponse, err := userClient.UpdateUser(context.Background(), updateUserRequest)
	if err != nil {
		log.Fatalf("Failed to update user information for UserID %d: %v", userID, err)
	}

	user = updateUserResponse.GetUser()
	log.Printf("Updated User Information for UserID %d:\nEmail: %s\nFirst Name: %s\nLast Name: %s",
		user.Id, user.Email, user.Fname, user.Lname)

	// Set up a connection to the Authentication Service server.
	authConn, err := grpc.Dial("localhost:50052", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect to Authentication Service: %v", err)
	}
	defer authConn.Close()

	// Create an Authentication Service client.
	authClient := authpb.NewAuthenticationServiceClient(authConn)

	// Example 3: Login and obtain an access token
	loginRequest := &authpb.LoginRequest{
		Email:    "user@example.com",
		Password: "password123",
	}

	// Call the Login RPC method to perform user login and obtain the access token.
	loginResponse, err := authClient.Login(context.Background(), loginRequest)
	if err != nil {
		log.Fatalf("Login failed: %v", err)
	}

	accessToken := loginResponse.GetAccessToken()
	log.Printf("Login successful! Access Token: %s", accessToken)
}
```
