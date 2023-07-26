package user_test

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
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestUpdateUser(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	userClient := pb.NewUserServiceClient(conn)
	user, _ := userRepository.CreateUser(&entities.UserEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword)), Fname: testFname, Lname: testLname})
	usersToDelete[0] = user.Email
	t.Run("rpc UpdateUser(expected behavior)", func(t *testing.T) {
		resp, err := userClient.UpdateUser(ctx, &pb.UpdateUserRequest{Id: int32(user.ID), Email: "test1@mail.de", Lname: "testings1"})
		if err != nil {
			t.Fatalf("UpdateUser failed: %v", err)
		}
		if resp.Id != int32(user.ID) {
			t.Fatalf(constants.InvalidFieldValueMessage("id"))
		}
		if resp.Email != "test1@mail.de" {
			t.Fatalf(constants.InvalidFieldValueMessage("email"))
		}
		if resp.Fname != user.Fname {
			t.Fatalf(constants.InvalidFieldValueMessage("fname"))
		}
		if resp.Lname != "testings1" {
			t.Fatalf(constants.InvalidFieldValueMessage("lname"))
		}
	})

	t.Run("rpc UpdateUser(invalid input)", func(t *testing.T) {
		_, err := userClient.UpdateUser(ctx, &pb.UpdateUserRequest{Id: int32(0), Email: "badmail"})
		if !strings.Contains(err.Error(), constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("id"))
		}
		if !strings.Contains(err.Error(), userConstants.MustBeValidEmailMessage) {
			t.Errorf(constants.InvalidFieldMessage("email"))

		}
	})

	t.Run("rpc UpdateUser(not found)", func(t *testing.T) {
		_, err := userClient.UpdateUser(ctx, &pb.UpdateUserRequest{Id: int32(999999)})

		if err.Error() != status.Error(codes.NotFound, userConstants.UserNotFoundMessage).Error() {
			t.Errorf(err.Error())
		}
	})

	t.Cleanup(func() {
		userRepository.HardDeleteUser(&entities.UserEntity{}, user.ID)
	})
}
