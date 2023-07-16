package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/user/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/user/internal/app/services/auth"
	"svetozar12/e-com/v2/apps/services/user/internal/app/services/user"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/env"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	postgres.InitPostgres()
	s := grpc.NewServer()
	auth.InitAuthServer(s)
	user.InitUserService(s)
	println("User service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
