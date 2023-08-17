package messageQues

import (
	"context"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func UpdateProductMessage(ch *amqp.Channel, imageName string) error {

	queueName := "product-update-queue"

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
			Body:        []byte(imageName),
		},
	)
	if err != nil {
		log.Fatalf("Failed to publish a message: %v", err)
	}
	return err
}
