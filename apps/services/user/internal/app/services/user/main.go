package user

import (
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"

	"google.golang.org/grpc"
)

func InitUserService(s *grpc.Server) {
	pb.RegisterUserServiceServer(s, &Server{})
}
