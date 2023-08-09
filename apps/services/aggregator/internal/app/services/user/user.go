package user

import (
	"context"
	"fmt"
	userPb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToUserService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING USER SERVICE")
	err := userPb.RegisterAuthenticationServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.USER_SERVICE_ADDRESS, opts)
	if err != nil {
		return err
	}
	err = userPb.RegisterUserServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.USER_SERVICE_ADDRESS, opts)
	if err != nil {
		return err
	}
	return nil
}
