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

func (s *Server) GetUser(ctx context.Context, in *pb.GetUserRequest) (*pb.User, error) {
	return getUser(ctx, in)
}

func (s *Server) DeleteUser(ctx context.Context, in *pb.DeleteUserRequest) (*pb.User, error) {
	return deleteUser(ctx, in)
}
