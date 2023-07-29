# Review service

The Review Service is a microservice responsible for managing product reviews within an e-commerce platform. It offers APIs for creating, retrieving, and listing product reviews, enabling users to share their experiences and feedback. This service plays a pivotal role in collecting and displaying valuable reviews to assist customers in making informed purchasing decisions.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-review
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
	pb "your_package_name/reviewpb" // Replace "your_package_name" with the actual package name for your protobuf definitions
)

func main() {
	// Set up a connection to the Review Service server.
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create a ReviewService client.
	client := pb.NewReviewServiceClient(conn)

	// Example: Create a new review
	newReview := &pb.Review{
		ReviewId:  1,
		ProductId: 123,
		UserId:    "user123",
		Comment:   "Great product! Highly recommended.",
		Rating:    5,
	}

	// Call the AddReview RPC method to create a new review.
	_, err = client.AddReview(context.Background(), &pb.AddReviewRequest{
		Review: newReview,
	})
	if err != nil {
		log.Fatalf("Failed to add review: %v", err)
	}
	log.Println("Review created successfully!")

	// Add other client usage examples here.
}

```
