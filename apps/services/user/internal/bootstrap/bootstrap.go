package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/user/internal/app/services/auth"

	"google.golang.org/grpc"
)

func Bootstrap() {
	println("gRPC server tutorial in Go")

	listener, err := net.Listen("tcp", ":9000")
	if err != nil {
		panic(err)
	}

	s := grpc.NewServer()
	auth.InitAuthServer(s)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
