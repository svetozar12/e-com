package productcatalog

import (
	"context"
	"fmt"
	productPb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToProductCatalogService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING PRODUCT CATALOG SERVICE")
	err := productPb.RegisterProducCatalogServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.PRODUCT_CATALOG_SERVICE_ADDRESS, opts)
	if err != nil {
		return err
	}

	return nil
}
