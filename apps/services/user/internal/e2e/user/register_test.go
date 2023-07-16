package user_test

import (
	"context"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/constants"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/jwtUtils"

	"google.golang.org/grpc"
)

var testEmail = "test@mail.de"
var testPassword = "123456"
var usersToDelete [2]string

func TestRegister(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	userClient := pb.NewUserServiceClient(conn)
	authClient := pb.NewAuthenticationServiceClient(conn)
	user, _ := userRepository.CreateUser(&entities.UserEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword))})
	usersToDelete[0] = user.Email
	t.Run("rpc Register(expected behavior)", func(t *testing.T) {
		resp, err := userClient.Register(ctx, &pb.RegisterRequest{Email: "test1@mail.de", Password: testPassword})
		if err != nil {
			t.Fatalf("Login failed: %v", err)
		}
		usersToDelete[1] = "test1@mail.de"
		verifyAccessToken, err := authClient.VerifyToken(ctx, &pb.VerifyTokenRequest{Token: resp.AccessToken})
		if err != nil {
			t.Fatalf("VerifyToken failed: %v", err)
		}
		if !verifyAccessToken.IsValid {
			panic(constants.InvalidTokenMessage)
		}
	})

	t.Run("rpc Register(invalid input)", func(t *testing.T) {
		_, err := userClient.Register(ctx, &pb.RegisterRequest{Email: "t", Password: "1"})
		if !strings.Contains(err.Error(), "value must be a valid email address") {
			t.Errorf(constants.InvalidFieldMessage("email"))
		}
		if !strings.Contains(err.Error(), constants.MinLenMessage("6")) {
			t.Errorf(constants.InvalidFieldMessage("password"))
		}
	})

	t.Cleanup(func() {
		for i := 0; i < len(usersToDelete); i++ {
			userRepository.HardDeleteUser(&entities.UserEntity{}, "email = ?", usersToDelete[i])
		}
	})
}
