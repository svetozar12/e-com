package rabbitmq

import (
	"fmt"
	"log"
	"sync"

	amqp "github.com/rabbitmq/amqp091-go"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var (
	once             sync.Once
	rabbitMQInstance *RabbitMQInstance
	rabbitMQMutex    sync.Mutex
)

type RabbitMQInstance struct {
	conn *amqp.Connection
}

// Singletone pattern
func GetRabbitMQInstance(url string) (*RabbitMQInstance, error) {
	once.Do(func() {
		conn, err := amqp.Dial(url)
		if err != nil {
			fmt.Println("Failed to initialize RabbitMQ instance:", err)
			return
		}
		rabbitMQInstance = &RabbitMQInstance{
			conn: conn,
		}
	})

	return rabbitMQInstance, nil
}

func (c *RabbitMQInstance) DeclareQueue(queueName string) error {
	channel, err := GetRabbitMQChannel()
	_, err = channel.QueueDeclare(
		queueName, // Queue name
		true,      // Durable
		false,     // Delete when unused
		false,     // Exclusive
		false,     // No-wait
		nil,       // Arguments
	)
	return err
}

func (c *RabbitMQInstance) Close() error {
	if c.conn != nil {
		return c.conn.Close()
	}
	return nil
}

func (c *RabbitMQInstance) CreateChannel() (*amqp.Channel, error) {
	if c.conn == nil {
		return nil, fmt.Errorf("connection is not initialized")
	}

	channel, err := c.conn.Channel()
	if err != nil {
		return nil, err
	}
	return channel, nil
}

func GetRabbitMQChannel() (*amqp.Channel, error) {
	instance, err := GetRabbitMQInstance("")
	if err != nil {
		return nil, status.Error(codes.Internal, "Problem with internal communication")
	}
	channel, err := instance.CreateChannel()
	if err != nil {
		return nil, status.Error(codes.Internal, "Problem with internal communication")
	}
	return channel, nil
}

func (c *RabbitMQInstance) DeclareQueues(queueNames ...string) {
	for _, queueName := range queueNames {
		if err := c.DeclareQueue(queueName); err != nil {
			log.Fatal(err)
		}
	}
}
