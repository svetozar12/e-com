package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/order/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/order/internal/app/services/order"
	"svetozar12/e-com/v2/apps/services/order/internal/pkg/env"
	grpcClients "svetozar12/e-com/v2/apps/services/order/internal/pkg/grpc-clients"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	grpcClients.InitClients()
	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	postgres.InitPostgres()
	s := grpc.NewServer()
	order.InitOrderService(s)
	println("order service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
