package fileupload

import (
	"io/ioutil"
	"os"
	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func uploadImageUtil(in *pb.ImageUploadRequest) (*os.File, error) {
	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	tempFile, err := ioutil.TempFile("temp-images", "upload-*.png")
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	defer tempFile.Close()

	// write this byte array to our temporary file
	_, err = tempFile.Write(in.ImageData)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	return tempFile, nil
}
