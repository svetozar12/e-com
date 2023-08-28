package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messaging/rabbitmq"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messaging/rabbitmq/consumers/fileUploadConsumers"
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/app/services/file-upload"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/pkg/constants"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/pkg/env"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	instance, err := rabbitmq.GetRabbitMQInstance(env.Envs.RABBIT_MQ_CONNECTION_STRING)
	if err != nil {
		panic(err)
	}
	ch, err := instance.CreateChannel()
	if err != nil {
		panic(err)
	}
	defer ch.Close()
	defer instance.Close()

	instance.DeclareQueues(constants.ProductUpdateQueueName,
		constants.FileUploadQueueName)

	go fileUploadConsumers.ConsumeFileUploadMessages(ch)

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

var ProductUpdateQueueName = "product-update-queue"
var FileDeleteQueueName = "file-delete-queue"
var FileUploadQueueName = "file-upload-queue"
