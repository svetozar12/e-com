package auth

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
)

type Server struct {
	pb.UnimplementedAuthenticationServiceServer
}

func (s *Server) VerifyToken(ctx context.Context, in *pb.VerifyTokenRequest) (*pb.VerifyTokenResponse, error) {
	return verifyToken(ctx, in)
}
