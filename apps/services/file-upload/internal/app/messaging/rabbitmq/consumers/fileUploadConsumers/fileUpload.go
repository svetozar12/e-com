package fileUploadConsumers

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messaging/rabbitmq"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messaging/rabbitmq/publishers/productCatalogPublishers"
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/app/services/file-upload"

	amqp "github.com/rabbitmq/amqp091-go"
)

func ConsumeFileUploadMessages(ch *amqp.Channel) {
	queueName := "file-upload-queue"

	// Set up the consumer
	msgs, err := ch.Consume(
		queueName, // Queue name
		"",        // Consumer
		false,     // Auto-ack (set to false for manual acknowledgment)
		false,     // Exclusive
		false,     // No-local
		false,     // No-wait
		nil,       // Args
	)
	if err != nil {
		log.Fatalf("Failed to start consuming messages: %v", err)
	}

	// Loop to process messages
	for msg := range msgs {
		var data map[string]interface{}
		err := json.Unmarshal(msg.Body, &data)
		if err != nil {
			log.Println("Error decoding message:", err)
			continue // Move to the next message
		}
		if data == nil {
			return
		}
		processFileUpload(data)
		// Acknowledge the message to remove it from the queue (if not using auto-ack)
		err = msg.Ack(false)
		if err != nil {
			log.Printf("Failed to acknowledge message: %v", err)
		}
	}
}

func processFileUpload(data map[string]interface{}) {
	imageData, err := base64.StdEncoding.DecodeString(data["Image"].(string))
	channel, err := rabbitmq.GetRabbitMQChannel()
	if err != nil {
		fmt.Println("Image data is not []byte, skipping file upload.", data["Image"])
		return
	}

	file, err := fileupload.UploadImageUtil(imageData)
	if err != nil {
		fmt.Println("Error in UploadImageUtil")
		panic(err)
	}

	productData := make(map[string]interface{})
	productData["Id"] = data["Id"]
	productData["Image"] = file.Name()

	err = productCatalogPublishers.UpdateProductMessage(channel, productData)
	if err != nil {
		fmt.Println("Error in UpdateProductMessage")
		panic(err)
	}
}
