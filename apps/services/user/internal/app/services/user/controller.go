package user

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
)

type Server struct {
	pb.UnimplementedUserServiceServer
}

func (s *Server) Register(ctx context.Context, in *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	return register(ctx, in)
}
