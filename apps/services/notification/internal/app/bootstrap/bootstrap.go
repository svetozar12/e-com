package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/notification/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/notification/internal/app/services/notification"
	"svetozar12/e-com/v2/apps/services/notification/internal/pkg/env"

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
	notification.InitNotificationService(s)
	println("Notification service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
