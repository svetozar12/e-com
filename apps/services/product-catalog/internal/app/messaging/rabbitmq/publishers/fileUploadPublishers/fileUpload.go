package fileUploadPublishers

import (
	"context"
	"encoding/json"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func UploadFileMessage(ch *amqp.Channel, fileData map[string]any) error {
	queueName := "file-upload-queue"
	data, err := json.Marshal(fileData)
	if err != nil {
		return err
	}
	err = ch.PublishWithContext(context.Background(),
		"",        // Exchange
		queueName, // Routing key
		false,     // Mandatory
		false,     // Immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        data,
		},
	)
	if err != nil {
		log.Fatalf("Failed to publish a message: %v", err)
	}
	return err
}
