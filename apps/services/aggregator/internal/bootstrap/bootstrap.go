package bootstrap

// import (
// 	"log"
// 	"net"
// 	"svetozar12/e-com/v2/apps/services/user/internal/app/databases/postgres"
// 	"svetozar12/e-com/v2/apps/services/user/internal/app/services/auth"
// 	"svetozar12/e-com/v2/apps/services/user/internal/app/services/user"

// 	"google.golang.org/grpc"
// )

// func Bootstrap() {
// 	println("gRPC server tutorial in Go")

// 	listener, err := net.Listen("tcp", ":9000")
// 	if err != nil {
// 		panic(err)
// 	}
// 	postgres.InitPostgres()
// 	s := grpc.NewServer()
// 	auth.InitAuthServer(s)
// 	user.InitUserService(s)
// 	if err := s.Serve(listener); err != nil {
// 		log.Fatalf("failed to serve: %v", err)
// 	}
// }
