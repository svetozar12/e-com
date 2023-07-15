package auth

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/env"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/jwtUtils"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func verifyToken(ctx context.Context, in *pb.VerifyTokenRequest) (*pb.VerifyTokenResponse, error) {
	if _, err := jwtUtils.ParseToken(in.Token, env.Envs.JWT_SECRET); err != nil {
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
	accessToken, errAccessToken := jwtUtils.SignToken(jwt.MapClaims{"email": user.Email, "iat": time.Now().Unix(), "exp": time.Now().Add(time.Hour * 24).Unix()}, env.Envs.JWT_SECRET)
	refreshToken, errRefreshToken := jwtUtils.SignToken(jwt.MapClaims{"email": user.Email, "iat": time.Now().Unix(), "exp": time.Now().Add(time.Hour * 48).Unix()}, env.Envs.JWT_SECRET)
	if errAccessToken != nil || errRefreshToken != nil {
		return nil, status.Error(codes.Unauthenticated, "Error while signing token")
	}
	return &pb.LoginResponse{AccessToken: accessToken, RefreshToken: refreshToken}, nil
}
