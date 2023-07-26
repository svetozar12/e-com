package user

import (
	"context"
	"fmt"
	fileuploadPb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToUserService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING FILE-UPLOAD SERVICE")
	err := fileuploadPb.RegisterImageUploadServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.FileUploadServiceAdress, opts)
	if err != nil {
		return err
	}

	return nil
}
