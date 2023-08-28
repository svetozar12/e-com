package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/messaging/rabbitmq"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/messaging/rabbitmq/consumers/inventoryConsumers"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/services/inventory"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/env"

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

	instance.DeclareQueues(constants.CreateInventoryRequestQuery, constants.CreateInventoryResponseQuery)
	go inventoryConsumers.ConsumeAddInventoryMessage(ch)

	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	postgres.InitPostgres()
	s := grpc.NewServer()
	inventory.InitInventoryService(s)
	println("Inventory service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
