package fileupload

import (
	pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"

	"google.golang.org/grpc"
)

func InitFileUploadService(s *grpc.Server) {
	pb.RegisterImageUploadServiceServer(s, &Server{})
}
