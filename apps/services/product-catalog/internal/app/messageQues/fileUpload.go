package messageQues

import (
	"context"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func UploadFileMessage(ch *amqp.Channel, file []byte) error {
	queueName := "file-upload-queue"
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
