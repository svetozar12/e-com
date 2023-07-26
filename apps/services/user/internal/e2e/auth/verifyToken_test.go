package auth_test

import (
	"context"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/user/internal/app/repositories/userRepository"
	userConstants "svetozar12/e-com/v2/apps/services/user/internal/pkg/constants"
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/jwtUtils"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
)

func TestVerifyToken(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewAuthenticationServiceClient(conn)
	user, _ := userRepository.CreateUser(&entities.UserEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword))})
	t.Run("rpc VerifyToken(expected behavior)", func(t *testing.T) {
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
			panic(userConstants.InvalidTokenMessage)
		}
	})
	t.Run("rpc VerifyToken(invalid token)", func(t *testing.T) {
		res, err := client.VerifyToken(ctx, &pb.VerifyTokenRequest{Token: "invalid token"})
		if err != nil {
			t.Fatalf("VerifyToken failed: %v", err)
		}
		if res.IsValid {
			t.Errorf(constants.InvalidFieldMessage("token"))
		}
	})
	t.Run("rpc VerifyToken(invalid input)", func(t *testing.T) {
		_, err := client.VerifyToken(ctx, &pb.VerifyTokenRequest{Token: ""})

		if !strings.Contains(err.Error(), constants.MinLenMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("token"))
		}
	})

	t.Cleanup(func() {
		userRepository.HardDeleteUser(user, nil)
	})
}
