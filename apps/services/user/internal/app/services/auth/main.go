package auth

import (
	pb "svetozar12/e-com/v2/libs/api/v1/user/dist/proto"

	"google.golang.org/grpc"
)

func InitAuthServer(s *grpc.Server) {
	pb.RegisterAuthenticationServiceServer(s, &Server{})
}
