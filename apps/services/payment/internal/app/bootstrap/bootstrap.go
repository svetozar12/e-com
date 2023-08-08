package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/payment/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/payment/internal/app/services/payment"
	"svetozar12/e-com/v2/apps/services/payment/internal/pkg/env"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	postgres.InitPostgres()
	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	s := grpc.NewServer()
	payment.InitPaymentService(s)
	println("Cart service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
