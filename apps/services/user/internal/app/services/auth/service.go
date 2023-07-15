package auth

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/env"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/jwtUtils"

	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func verifyToken(ctx context.Context, in *pb.VerifyTokenRequest) (*pb.VerifyTokenResponse, error) {
	if _, err := jwtUtils.ParseToken(in.Token); err != nil {
		return &pb.VerifyTokenResponse{IsValid: false}, nil
	}
	return &pb.VerifyTokenResponse{IsValid: true}, nil
}

func login(ctx context.Context, in *pb.LoginRequest) (*pb.LoginResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	user, err := userRepository.GetUser("email = ?", in.Email)
	if err != nil || !jwtUtils.ComparePassword(user.Password, []byte(in.Password)) {
		return nil, status.Error(codes.Unauthenticated, "Wrong credentials")
	}
	token, err := jwtUtils.SignToken(jwt.MapClaims{"Email": user.Email}, env.Envs.JWT_SECRET)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "Error while signing token")
	}
	return &pb.LoginResponse{Token: token}, nil
}
