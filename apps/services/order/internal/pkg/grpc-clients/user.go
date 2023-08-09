package grpcClients

import (
	"fmt"
	pbUser "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/order/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var UserClient pbUser.UserServiceClient

func initUserCLient() {
	conn, err := grpc.Dial(env.Envs.USER_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Errorf("Failed to dial bufnet: %v", err)
	}
	client := pbUser.NewUserServiceClient(conn)
	UserClient = client
	fmt.Println("User client READY")
}
