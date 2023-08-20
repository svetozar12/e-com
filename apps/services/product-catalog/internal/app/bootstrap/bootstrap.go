package bootstrap

import (
	"encoding/json"
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

	amqp "github.com/rabbitmq/amqp091-go"
	"google.golang.org/grpc"
	"gorm.io/gorm"
)

func Bootstrap() {
	env.InitConfig()
	ch, conn, err := messageQues.RabbitMqConnect("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
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

	ConsumeProductUpdateMessage(ch)
	defer conn.Close()
	defer ch.Close()
}

func ConsumeProductUpdateMessage(ch *amqp.Channel) {
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
		fmt.Println("Update Product File Name", string(msg.Body))
		var data map[string]interface{}
		err := json.Unmarshal(msg.Body, &data)
		if err != nil {
			panic(err)
		}
		processProductUpdate(data)
	}
}

func processProductUpdate(data map[string]interface{}) {
	fmt.Println(data, "QVORE")
	product, _ := productRepository.UpdateProduct(&entities.ProductEntity{Image: string(data["image"].(string)), Model: gorm.Model{ID: uint(data["id"].(int32))}})
	fmt.Println(product)
}
