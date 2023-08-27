package fileupload

import (
	"context"
	"io/ioutil"
	"log"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"

	"google.golang.org/grpc"
)

func FileUpload(t *testing.T) {
	var imageIds [1]string
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}

	client := pb.NewImageUploadServiceClient(conn)
	t.Run("rpc UploadImage(expected behavior)", func(t *testing.T) {
		body, err := ioutil.ReadFile("test.png")
		if err != nil {
			log.Fatalf("unable to read file: %v", err)
		}
		resp, err := client.UploadImage(ctx, &pb.ImageUploadRequest{ImageData: body})
		if err != nil {
			t.Fatalf("UploadImage failed: %v", err)
		}
		imageIds[0] = resp.FileId
	})
	t.Cleanup(func() {
		for i := 0; i < len(imageIds); i++ {
			_, err := client.DeleteImage(ctx, &pb.DeleteImageRequest{Id: imageIds[i]})
			if err != nil {
				t.Fatalf("error in cleanup: %v", err)
			}
		}
		defer conn.Close()
	})
}
