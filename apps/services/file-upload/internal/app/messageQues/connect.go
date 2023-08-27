package messageQues

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/app/services/file-upload"

	amqp "github.com/rabbitmq/amqp091-go"
)

var FileUploadCh *amqp.Channel

func RabbitMqConnect(connectionString string) (*amqp.Channel, *amqp.Connection, error) {
	conn, err := amqp.Dial(connectionString) // Replace with your RabbitMQ server info
	if err != nil {
		return nil, nil, err
	}
	fmt.Println("Successfully connected to RabbitMq")
	ch, err := conn.Channel()
	if err != nil {
		return nil, nil, err
	}

	FileUploadCh = ch

	return ch, conn, nil
}

func processFileUpload(data map[string]interface{}) {
	imageData, err := base64.StdEncoding.DecodeString(data["Image"].(string))
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

	err = UpdateProductMessage(FileUploadCh, productData)
	if err != nil {
		fmt.Println("Error in UpdateProductMessage")
		panic(err)
	}
}

func Boots() {
	ch, conn, err := RabbitMqConnect("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	defer ch.Close()
	ConsumeFileUploadMessages(ch)
}

func ConsumeFileUploadMessages(ch *amqp.Channel) {
	queueName := "file-upload-queue"
	// Declare the queue if it doesn't exist
	_, err := ch.QueueDeclare(
		queueName, // Queue name
		true,      // Durable
		false,     // Delete when unused
		false,     // Exclusive
		false,     // No-wait
		nil,       // Arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
	}

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
