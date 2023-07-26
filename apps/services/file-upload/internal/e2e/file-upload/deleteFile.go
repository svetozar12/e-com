package fileupload

import (
	"context"
	"io/ioutil"
	"log"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
)

func DeleteFile(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()

	client := pb.NewImageUploadServiceClient(conn)
	t.Run("rpc DeleteFile(expected behavior)", func(t *testing.T) {
		body, err := ioutil.ReadFile("test.png")
		if err != nil {
			log.Fatalf("unable to read file: %v", err)
		}
		resp, err := client.UploadImage(ctx, &pb.ImageUploadRequest{ImageData: body})
		if err != nil {
			t.Fatalf("UploadImage failed: %v", err)
		}
		respDeleteFIle, errDeleteFile := client.DeleteImage(ctx, &pb.DeleteImageRequest{Id: resp.FileId})
		if errDeleteFile != nil {
			t.Fatalf("DleteImage failed: %v", err)
		}
		if respDeleteFIle.Success != true {
			t.Fatalf(constants.InvalidFieldValueMessage("Success"))
		}
	})
	t.Run("rpc DeleteFile(invalid input)", func(t *testing.T) {

		_, err := client.DeleteImage(ctx, &pb.DeleteImageRequest{Id: ""})
		if !strings.Contains(err.Error(), constants.MinLenMessage("1")) {
			t.Fatalf(constants.InvalidFieldMessage("id"))
		}

	})
}
