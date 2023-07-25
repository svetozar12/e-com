package fileupload

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"

	"google.golang.org/grpc"
)

func FileUpload(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
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
		fmt.Println(resp, "response")
	})

}
