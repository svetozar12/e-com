package auth

import (
	"context"
	pb "svetozar12/e-com/v2/libs/api/v1/user/dist/proto"

	"google.golang.org/grpc"
)

type Server struct {
	pb.UnimplementedTutorialServer
}

// We implement the SayHello method of the server interface. 🥳🥳🥳
func (s *Server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	return sayHello(ctx, in)
}

func InitAuthServer(s *grpc.Server) {
	pb.RegisterTutorialServer(s, &Server{})
}
