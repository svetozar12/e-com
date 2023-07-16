package auth_test

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
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var testEmail = "test@mail.de"
var testPassword = "123456"

func TestLogin(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewAuthenticationServiceClient(conn)
	user, _ := userRepository.CreateUser(&entities.UserEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword))})
	t.Run("rpc Login(expected behavior)", func(t *testing.T) {
		resp, err := client.Login(ctx, &pb.LoginRequest{Email: testEmail, Password: testPassword})
		if err != nil {
			t.Fatalf("Login failed: %v", err)
		}
		verifyAccessToken, err := client.VerifyToken(ctx, &pb.VerifyTokenRequest{Token: resp.AccessToken})
		if err != nil {
			t.Fatalf("VerifyToken failed: %v", err)
		}
		verifyRefreshToken, err := client.VerifyToken(ctx, &pb.VerifyTokenRequest{Token: resp.RefreshToken})
		if err != nil {
			t.Fatalf("VerifyToken failed: %v", err)
		}
		if !verifyAccessToken.IsValid || !verifyRefreshToken.IsValid {
			panic(constants.InvalidTokenMessage)
		}
	})
	t.Run("rpc Login(invalid input)", func(t *testing.T) {
		_, err := client.Login(ctx, &pb.LoginRequest{Email: "bad email 12", Password: "1"})

		if !strings.Contains(err.Error(), "value must be a valid email address") {
			t.Errorf(constants.InvalidFieldMessage("token"))
		}
		if !strings.Contains(err.Error(), constants.MinLenMessage("6")) {
			t.Errorf(constants.InvalidFieldMessage("token"))
		}
	})
	t.Run("rpc Login(wrong credentials)", func(t *testing.T) {
		_, err := client.Login(ctx, &pb.LoginRequest{Email: "test123@mail.de", Password: "12345678"})

		if err.Error() != status.Error(codes.Unauthenticated, "Wrong credentials").Error() {
			t.Errorf(err.Error())
		}

	})
	t.Cleanup(func() {
		userRepository.HardDeleteUser(user)
	})
}
