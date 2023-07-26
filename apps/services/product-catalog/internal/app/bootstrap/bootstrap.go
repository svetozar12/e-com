package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/services/product"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/env"
	grpcclients "svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/grpc-clients"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	grpcclients.InitClients()
	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	postgres.InitPostgres()
	s := grpc.NewServer()
	product.InitUserService(s)
	println("User service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
