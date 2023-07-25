package fileupload

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
)

type Server struct {
	pb.UnimplementedImageUploadServiceServer
}

func (s *Server) UploadImage(ctx context.Context, in *pb.ImageUploadRequest) (*pb.ImageUploadResponse, error) {
	return uploadImage(ctx, in)
}

func (s *Server) GetImage(ctx context.Context, in *pb.GetImageRequest) (*pb.GetImageResponse, error) {
	return getImage(ctx, in)
}
