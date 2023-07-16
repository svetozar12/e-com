package user

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/constants"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/env"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/jwtUtils"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func register(ctx context.Context, in *pb.RegisterRequest) (*pb.RegisterResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	if user, _ := userRepository.GetUser("email = ?", in.Email); user.Email != "" {
		return nil, status.Error(codes.AlreadyExists, constants.UserAlreadyExistMessage)
	}

	hashedPassword := jwtUtils.HashAndSalt([]byte(in.Password))
	user, err := userRepository.CreateUser(&entities.UserEntity{Email: in.Email, Password: hashedPassword})
	if err != nil {
		return nil, status.Error(codes.AlreadyExists, err.Error())
	}

	accessToken, err := jwtUtils.SignToken(jwt.MapClaims{"email": user.Email, "iat": time.Now().Unix(), "exp": time.Now().Add(time.Hour * 24).Unix()}, env.Envs.JWT_SECRET)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, constants.UnableToSignJWTMessage)
	}

	return &pb.RegisterResponse{AccessToken: accessToken}, nil
}

func getUser(ctx context.Context, in *pb.GetUserRequest) (*pb.User, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	user, err := userRepository.GetUser("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.UserNotFoundMessage)
	}
	return &pb.User{Id: int32(user.ID), Email: user.Email}, nil
}

func updateUser(ctx context.Context, in *pb.UpdateUserRequest) (*pb.User, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	user, err := userRepository.GetUser("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.AlreadyExists, constants.UserNotFoundMessage)
	}

	if in.Email != "" {
		user.Email = in.Email
	}
	if in.Fname != "" {
		user.Fname = in.Fname
	}
	if in.Lname != "" {
		user.Lname = in.Lname
	}
	updatedUser, err := userRepository.UpdateUser(user)
	if err != nil {
		return nil, status.Error(codes.Internal, constants.UserNotUpdateMessage)
	}
	return &pb.User{Id: int32(updatedUser.ID), Email: updatedUser.Email, Fname: updatedUser.Fname, Lname: updatedUser.Lname}, nil
}

func deleteUser(ctx context.Context, in *pb.DeleteUserRequest) (*pb.User, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	user, err := userRepository.GetUser("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.UserNotFoundMessage)
	}
	_, err = userRepository.DeleteUser(user)
	if err != nil {
		return nil, status.Error(codes.Internal, constants.UserNotDeletedMessage)
	}
	return &pb.User{}, nil
}
