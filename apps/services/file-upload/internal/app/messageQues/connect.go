package messageQues

import (
	"fmt"
	"log"

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
	queueName := "product-update-queue"

	_, err = ch.QueueDeclare(
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

	return ch, conn, nil
}
