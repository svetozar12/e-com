package auth

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
)

func verifyToken(ctx context.Context, in *pb.VerifyTokenRequest) (*pb.VerifyTokenResponse, error) {
	return &pb.VerifyTokenResponse{IsValid: true}, nil
}
