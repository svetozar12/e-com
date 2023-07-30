package inventory

import (
	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"

	"google.golang.org/grpc"
)

func InitInventoryService(s *grpc.Server) {
	pb.RegisterInventoryServiceServer(s, &Server{})
}
