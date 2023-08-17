package messageQues

import (
	"context"
	"fmt"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func UploadFileMessage(ch *amqp.Channel, file []byte) error {
	queueName := "file-upload-queue"
	fmt.Println("UPLOAD IMAGE Product catalog")
	_, err := ch.QueueDeclare(
		queueName, // Queue name
		true,      // Durable
		false,     // Delete when unused
		false,     // Exclusive
		false,     // No-wait
		nil,       // Arguments
	)
	if err != nil {
		fmt.Printf("Failed to declare a queue: %v\n", err)
		return err
	}

	err = ch.PublishWithContext(context.Background(),
		"",        // Exchange
		queueName, // Routing key
		false,     // Mandatory
		false,     // Immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        file,
		},
	)
	if err != nil {
		log.Fatalf("Failed to publish a message: %v", err)
	}
	return err
}
