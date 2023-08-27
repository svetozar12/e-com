package productCatalogConsumers

import (
	"encoding/json"
	"log"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"

	amqp "github.com/rabbitmq/amqp091-go"
)

func ConsumeProductUpdateMessage(ch *amqp.Channel) {
	queueName := "product-update-queue"
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
