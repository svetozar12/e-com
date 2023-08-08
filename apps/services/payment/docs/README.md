# Payment service

The Payment Service securely handles payment processing, authorizing and capturing transactions for customers. It supports various payment methods, validates details, and ensures swift, error-free payments. Fraud prevention and adherence to industry standards ensure data security. Smooth integration with the Order Service enables seamless order fulfillment.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-payment
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

	"google.golang.org/grpc"
	paymentpb "path/to/paymentpb" // Replace with the actual path to your generated paymentpb package
)

func main() {
	// Set up the connection to the gRPC server.
	conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	// Create a client for the Payment Service.
	client := paymentpb.NewPaymentServiceClient(conn)

	// Example payment request (replace with actual payment details).
	paymentRequest := &paymentpb.PaymentRequest{
		PaymentMethod: "credit_card",
		CardNumber:    "1234567890123456",
		ExpirationDate: "12/23",
		Cvv:           "123",
		Amount:        100.00,
		Currency:      "USD",
	}

	// Call the ProcessPayment RPC on the Payment Service.
	paymentResponse, err := client.ProcessPayment(context.Background(), paymentRequest)
	if err != nil {
		log.Fatalf("Failed to process payment: %v", err)
	}

	// Process the payment response.
	if paymentResponse.Success {
		fmt.Println("Payment successful! Transaction ID:", paymentResponse.TransactionId)
	} else {
		fmt.Println("Payment failed. Message:", paymentResponse.Message)
	}
}
```
