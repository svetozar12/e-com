package fileupload

import (
	"context"
	"io/ioutil"
	"log"
	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func uploadImage(ctx context.Context, in *pb.ImageUploadRequest) (*pb.ImageUploadResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	tempFile, err := ioutil.TempFile("temp-images", "upload-*.png")
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	defer tempFile.Close()

	// write this byte array to our temporary file
	_, err = tempFile.Write(in.ImageData.Data)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	return &pb.ImageUploadResponse{Success: true, FileId: tempFile.Name()}, nil
}

func getImage(ctx context.Context, in *pb.GetImageRequest) (*pb.GetImageResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	body, err := ioutil.ReadFile("temp-images/" + in.Id)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}
	return &pb.GetImageResponse{ImageData: body, ImageUrl: ""}, nil
}
