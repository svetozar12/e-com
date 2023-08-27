package bootstrap

import (
	"encoding/json"
	"fmt"
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/messageQues"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/services/product"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/env"
	grpcclients "svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/grpc-clients"

	amqp "github.com/rabbitmq/amqp091-go"
	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	ch, conn, err := messageQues.RabbitMqConnect("amqp://guest:guest@localhost:5672/")
	if err != nil {
		fmt.Println(err)
	}
	defer conn.Close()
	defer ch.Close()
	go ConsumeProductUpdateMessage(ch)
	grpcclients.InitClients()

	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	postgres.InitPostgres()
	s := grpc.NewServer()
	product.InitProductService(s)
	println("Product Catalog service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}

func ConsumeProductUpdateMessage(ch *amqp.Channel) {
	queueName := "product-update-queue"
	// Declare the queue if it doesn't exist
	_, err := ch.QueueDeclare(
		queueName, // Queue name
		true,      // Durable
		false,     // Delete when unused
		false,     // Exclusive
		false,     // No-wait
		nil,       // Arguments
	)
	msgs, err := ch.Consume(
		queueName, // Queue name
		"",        // Consumer
		true,      // Auto-ack (set to false for manual acknowledgment)
		false,     // Exclusive
		false,     // No-local
		false,     // No-wait
		nil,       // Args
	)
	if err != nil {
		log.Fatalf("Failed to start consuming messages: %v", err)
	}
	for msg := range msgs {
		var data map[string]interface{}
		err := json.Unmarshal(msg.Body, &data)
		if err != nil {
			log.Println("Error decoding message:", err)
			continue // Move to the next message
		}
		processProductUpdate(data)
	}
}

func processProductUpdate(data map[string]interface{}) {
	// Check if data is nil before proceeding
	if data == nil {
		log.Println("Received nil data, skipping update.")
		return
	}

	// Get the existing product by ID
	existingProduct, err := productRepository.GetProduct("id = ?", uint(data["Id"].(float64)))
	if err != nil {
		log.Println("Error getting existing product:", err)
		return
	}

	// Update the product's Image property
	existingProduct.Image = string(data["Image"].(string))

	// Process the product update
	_, err = productRepository.UpdateProduct(existingProduct)
	if err != nil {
		log.Println("Error updating product:", err)
	}
}
