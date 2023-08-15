package fileupload

import (
	"context"
	"os"
	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/pkg/constants"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func uploadImage(ctx context.Context, in *pb.ImageUploadRequest) (*pb.ImageUploadResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	file, err := uploadImageUtil(in)
	if err != nil {
		return nil, err
	}
	return &pb.ImageUploadResponse{Success: true, FileId: file.Name()}, nil
}

func getImage(ctx context.Context, in *pb.GetImageRequest) (*pb.GetImageResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	body, err := os.ReadFile(in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.ImageNotFound)
	}
	return &pb.GetImageResponse{ImageData: body}, nil
}

func deleteImage(ctx context.Context, in *pb.DeleteImageRequest) (*pb.DeleteImageResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	e := os.Remove(in.Id)
	if e != nil {
		return nil, status.Error(codes.NotFound, constants.ImageNotFound)
	}

	return &pb.DeleteImageResponse{Success: true}, nil

}
