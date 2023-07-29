package review

import (
	pb "svetozar12/e-com/v2/api/v1/review/dist/proto"

	"google.golang.org/grpc"
)

func InitInventoryService(s *grpc.Server) {
	pb.RegisterReviewServiceServer(s, &Server{})
}
