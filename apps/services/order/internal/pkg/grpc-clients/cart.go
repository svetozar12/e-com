package grpcClients

import (
	"fmt"
	pbCart "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	"svetozar12/e-com/v2/apps/services/order/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var CartClient pbCart.CartServiceClient

func initCartClient() {
	conn, err := grpc.Dial(env.Envs.CART_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Errorf("Failed to dial bufnet: %v", err)
	}
	client := pbCart.NewCartServiceClient(conn)
	CartClient = client
	fmt.Println("Cart client READY")
}
