package review

import (
	"context"
	"fmt"
	reviewPb "svetozar12/e-com/v2/api/v1/review/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToReviewService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING REVIEW SERVICE")
	err := reviewPb.RegisterReviewServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.ReviewServiceAdress, opts)
	if err != nil {
		return err
	}

	return nil
}
