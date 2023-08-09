package getfile

import (
	"context"
	"fmt"
	"log"
	"net/http"
	fileuploadPb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var fileUploadClient fileuploadPb.ImageUploadServiceClient

func initFileUploadClients() {
	conn, err := grpc.Dial(env.Envs.FILE_UPLOAD_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	fileUploadClient = fileuploadPb.NewImageUploadServiceClient(conn)
}

func handleGetFile(w http.ResponseWriter, r *http.Request, params map[string]string) {
	imageId := r.URL.Query().Get("imageId")
	fmt.Println(imageId)
	// imageId := params["id"]
	ctx := context.Background()
	data, err := fileUploadClient.GetImage(ctx, &fileuploadPb.GetImageRequest{Id: imageId})
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to upload file: %s", err.Error()), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "image/png")
	w.Write(data.ImageData)
}

func InitProductCatalogHandlers(gwMux *runtime.ServeMux) {
	initFileUploadClients()
	gwMux.HandlePath("GET", "/v1/file-upload", handleGetFile)
}
