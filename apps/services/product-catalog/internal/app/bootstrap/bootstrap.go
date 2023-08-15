package bootstrap

import (
	"context"
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/services/product"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/env"
	grpcclients "svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/grpc-clients"
	"svetozar12/e-com/v2/libs/api/rabitmq"

	amqp "github.com/rabbitmq/amqp091-go"
	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	ch, conn, err := rabitmq.RabbitMqConnect("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	defer ch.Close()

	queueName := "file-upload-queue"

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
	body := "Hello! This is an file-upload notification."

	err = ch.PublishWithContext(context.Background(),
		"",        // Exchange
		queueName, // Routing key
		false,     // Mandatory
		false,     // Immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		},
	)
	if err != nil {
		log.Fatalf("Failed to publish a message: %v", err)
	}

	grpcclients.InitClients()
	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	postgres.InitPostgres()
	s := grpc.NewServer()
	product.InitProductService(s)
	println("Product Catalog service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
