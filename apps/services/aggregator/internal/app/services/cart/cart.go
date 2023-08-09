package cart

import (
	"context"
	"fmt"
	cartPb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToCartService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING CART SERVICE")
	err := cartPb.RegisterCartServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.CART_SERVICE_ADDRESS, opts)
	if err != nil {
		return err
	}

	return nil
}
