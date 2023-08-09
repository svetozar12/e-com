package order

import (
	"context"
	"fmt"
	orderPb "svetozar12/e-com/v2/api/v1/order/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToOrderService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING ORDER SERVICE")
	err := orderPb.RegisterOrderServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.CART_SERVICE_ADDRESS, opts)
	if err != nil {
		return err
	}

	return nil
}
