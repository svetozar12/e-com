# User service

The Cart Service is a microservice responsible for managing the shopping cart functionality in an e-commerce application. It allows users to add, update, and remove items from their cart, as well as retrieve the contents of their cart. The service handles concurrency, integrates with other systems, and provides a smooth shopping experience for users.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-cart
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
	"fmt"
	"log"
	"your-package-path/cart" // Import the generated gRPC client package
	"google.golang.org/grpc"
)

func main() {
	// Set up a connection to the gRPC server.
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create a new CartService client using the connection.
	client := cart.NewCartServiceClient(conn)

	// Prepare the AddToCartRequest message.
	request := &cart.AddToCartRequest{
		ProductId:   12,
		Quantity:      1,
		PricePerItem:  1200.00,
		Currency:      "USD",
	}

	// Make the gRPC AddToCart RPC call.
	response, err := client.AddToCart(context.Background(), request)
	if err != nil {
		log.Fatalf("AddToCart RPC failed: %v", err)
	}

	// Process the response from the Cart Service.
	if response.Success {
		fmt.Println("Item added to cart successfully.")
		fmt.Println("Shopping Cart Contents:")
		for _, item := range response.Cart.Items {
			fmt.Printf("Product: %s, Quantity: %d, Price: %.2f %s\n", item.ProductId, item.Quantity, item.PricePerItem, item.Currency)
		}
		fmt.Printf("Total Price: %.2f %s\n", response.Cart.TotalPrice, request.Currency)
	} else {
		fmt.Println("Failed to add item to cart. Reason:", response.Message)
	}
}
```
