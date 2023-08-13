package grpcclients

import (
	"fmt"
	pbFileUpload "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var FileUploadClient pbFileUpload.ImageUploadServiceClient

func initFileUploadClient() {
	conn, err := grpc.Dial(env.Envs.FILE_UPLOAD_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Errorf("Failed to dial bufnet: %v", err)
	}
	client := pbFileUpload.NewImageUploadServiceClient(conn)
	FileUploadClient = client
	fmt.Println("FileUpload client READY")
}
