package user

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/env"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/jwtUtils"

	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func register(ctx context.Context, in *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	pwd := jwtUtils.HashAndSalt([]byte(in.Password))
	user := userRepository.CreateUser(&entities.UserEntity{Email: in.Email, Password: pwd})
	token, err := jwtUtils.SignToken(jwt.MapClaims{"Email": user.Email}, env.Envs.JWT_SECRET)

	if err != nil {
		return nil, status.Error(codes.Unauthenticated, "Error while signing token")
	}

	return &pb.RegisterResponse{Token: token}, nil
}
