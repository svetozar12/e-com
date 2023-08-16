package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messageQues"
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/app/services/file-upload"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/pkg/env"

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
	queueName := "file-upload-queue"

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

		processFileUpload(msg.Body)
	}
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
	// ... (Handle the notification message and perform necessary actions)
	file, err := fileupload.UploadImageUtil(message)
	if err != nil {
		panic(err)
	}
	messageQues.UpdateProductMessage(messageQues.FileUploadCh, file.Name())
}
