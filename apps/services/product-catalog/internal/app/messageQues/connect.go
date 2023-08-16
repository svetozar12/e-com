package messageQues

import (
	"fmt"

	amqp "github.com/rabbitmq/amqp091-go"
)

var ProductCatalogCh *amqp.Channel

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

	ProductCatalogCh = ch

	return ch, conn, nil
}
