package bootstrap

import (
	"fmt"
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/messageQues"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/services/product"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/env"
	grpcclients "svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/grpc-clients"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	ch, conn, err := messageQues.RabbitMqConnect("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
	}
	queueName := "product-update-queue"

	msgs, err := ch.Consume(
		queueName, // Queue name
		"",        // Consumer
		true,      // Auto-ack (set to false for manual acknowledgment)
		false,     // Exclusive
		false,     // No-local
		false,     // No-wait
		nil,       // Args
	)
	if err != nil {
		log.Fatalf("Failed to start consuming messages: %v", err)
	}
	for msg := range msgs {

		processProductUpdate(msg.Body)
	}
	defer conn.Close()
	defer ch.Close()

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

func processProductUpdate(message []byte) {
	product, _ := productRepository.UpdateProduct(&entities.ProductEntity{Image: string(message)})
	fmt.Println(product)
}
