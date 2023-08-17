package bootstrap

import (
	"fmt"
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messageQues"
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/app/services/file-upload"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/pkg/env"

	amqp "github.com/rabbitmq/amqp091-go"
	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	ch, conn, err := messageQues.RabbitMqConnect("amqp://guest:guest@localhost:5672/")
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	defer ch.Close()
	ConsumeFileUploadMessages(ch)

	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	s := grpc.NewServer()
	fileupload.InitFileUploadService(s)
	println("file-upload service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}

func processFileUpload(message []byte) {
	fmt.Println("UPLOAD IMAGE in other service")

	// ... (Handle the notification message and perform necessary actions)
	file, err := fileupload.UploadImageUtil(message)
	if err != nil {
		panic(err)
	}
	messageQues.UpdateProductMessage(messageQues.FileUploadCh, file.Name())
}

func ConsumeFileUploadMessages(ch *amqp.Channel) {
	queueName := "file-upload-queue"

	// Declare the queue if it doesn't exist
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

	// Set up the consumer
	msgs, err := ch.Consume(
		queueName, // Queue name
		"",        // Consumer
		false,     // Auto-ack (set to false for manual acknowledgment)
		false,     // Exclusive
		false,     // No-local
		false,     // No-wait
		nil,       // Args
	)
	if err != nil {
		log.Fatalf("Failed to start consuming messages: %v", err)
	}

	// Loop to process messages
	for msg := range msgs {
		processFileUpload(msg.Body)
		// Acknowledge the message to remove it from the queue (if not using auto-ack)
		err := msg.Ack(false)
		if err != nil {
			log.Printf("Failed to acknowledge message: %v", err)
		}
	}
}
