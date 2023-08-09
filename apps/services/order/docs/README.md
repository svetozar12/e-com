# Order service

The Order Service manages the creation, modification, and retrieval of customer orders, ensuring smooth processing and coordination within the microservices architecture.

## Setup

```shell
# should be ran in the root
yarn
yarn nx build services-order
yarn nx serve services-order
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
    "log"
    "context"
    "google.golang.org/grpc"
    pb "path/to/your/order/proto" // Import your generated order protobuf package
)

func main() {
    // Set up a connection to the server.
    conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
    if err != nil {
        log.Fatalf("did not connect: %v", err)
    }
    defer conn.Close()

    // Create a new OrderService client using the connection.
    client := pb.NewOrderServiceClient(conn)

    // Create a sample order request.
    orderReq := &pb.CreateOrderRequest{
        Items: []*pb.Item{
            {ProductId: "p1", Quantity: 2},
            {ProductId: "p2", Quantity: 1},
        },
        UserId:          "123",
        ShippingAddress: "123 Main St",
        StripeToken:     "tok_visa",
    }

    // Contact the server to create an order.
    ctx := context.Background()
    orderResp, err := client.CreateOrder(ctx, orderReq)
    if err != nil {
        log.Fatalf("could not create order: %v", err)
    }
    log.Printf("Order ID: %s", orderResp.OrderId)
}
```
