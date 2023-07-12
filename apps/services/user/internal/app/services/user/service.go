package user

import (
	"context"
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	pb "svetozar12/e-com/v2/libs/api/v1/user/dist/proto"
)

func register(ctx context.Context, in *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	user := userRepository.CreateUser(&entities.UserEntity{Email: in.Email})
	return &pb.RegisterResponse{Token: user.Email}, nil
}
