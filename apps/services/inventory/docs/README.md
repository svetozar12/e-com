# Inventory service

The E-commerce Inventory Service is a microservice that manages product inventory for an e-commerce system. It provides APIs for tracking stock levels, checking product availability, and updating inventory when orders are placed. This service plays a crucial role in maintaining accurate stock information and ensuring seamless order fulfillment.

## Setup

```shell
# should be ran in the root
yarn
yarn nx build services-inventory
yarn nx serve services-inventory
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
	pb "your_package_name/inventorypb" // Replace "your_package_name" with the actual package name for your protobuf definitions
)

func main() {
	// Set up a connection to the Inventory Service server.
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create an InventoryService client.
	client := pb.NewInventoryServiceClient(conn)

	// Example 1: Get inventory information for a specific product
	productID := 123

	// Call the GetInventory RPC method to retrieve inventory information.
	getInventoryResponse, err := client.GetInventory(context.Background(), &pb.GetInventoryRequest{
		ProductId: productID,
	})
	if err != nil {
		log.Fatalf("Failed to get inventory for product ID %d: %v", productID, err)
	}

	inventory := getInventoryResponse.GetInventory()
	log.Printf("Inventory for Product ID %d:\nID: %d\nAvailable Quantity: %d",
		inventory.ProductId, inventory.Id, inventory.AvailableQuantity)

	// Example 2: Update the available quantity of a product in the inventory
	newQuantity := 50

	// Call the UpdateInventory RPC method to update the available quantity.
	updateInventoryResponse, err := client.UpdateInventory(context.Background(), &pb.UpdateInventoryRequest{
		ProductId:    productID,
		NewQuantity:  newQuantity,
	})
	if err != nil {
		log.Fatalf("Failed to update inventory for product ID %d: %v", productID, err)
	}

	inventory = updateInventoryResponse.GetInventory()
	log.Printf("Updated Inventory for Product ID %d:\nID: %d\nAvailable Quantity: %d",
		inventory.ProductId, inventory.Id, inventory.AvailableQuantity)

	// Add other client usage examples here.
}
```
