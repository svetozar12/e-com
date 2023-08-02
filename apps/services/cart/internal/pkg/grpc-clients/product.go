package grpcclients

import (
	"fmt"
	pbProduct "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/cart/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var ProductClient pbProduct.ProducCatalogServiceClient

func initProductClient() {
	conn, err := grpc.Dial(env.Envs.ProductCatalogServiceAdress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Errorf("Failed to dial bufnet: %v", err)
	}
	client := pbProduct.NewProducCatalogServiceClient(conn)
	ProductClient = client
	fmt.Println("Product client READY")
}
