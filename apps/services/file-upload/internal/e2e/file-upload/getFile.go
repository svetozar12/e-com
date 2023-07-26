package fileupload

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
)

func GetFile(t *testing.T) {
	var imageIds [1]string
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	client := pb.NewImageUploadServiceClient(conn)
	t.Run("rpc GetFile(expected behavior)", func(t *testing.T) {
		body, err := ioutil.ReadFile("test.png")
		if err != nil {
			log.Fatalf("unable to read file: %v", err)
		}
		resp, err := client.UploadImage(ctx, &pb.ImageUploadRequest{ImageData: body})
		if err != nil {
			t.Fatalf("UploadImage failed: %v", err)
		}
		imageIds[0] = resp.FileId
		_, errGetFile := client.GetImage(ctx, &pb.GetImageRequest{Id: resp.FileId})
		if errGetFile != nil {
			t.Fatalf("GetImage failed: %v", err)
		}

		fmt.Println(resp, "response")
	})
	t.Run("rpc GetFile(invalid input)", func(t *testing.T) {

		_, err := client.GetImage(ctx, &pb.GetImageRequest{Id: ""})
		if !strings.Contains(err.Error(), constants.MinLenMessage("1")) {
			t.Fatalf(constants.InvalidFieldMessage("id"))
		}

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
