package order

import (
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"

	"google.golang.org/grpc"
)

func InitOrderService(s *grpc.Server) {
	pb.RegisterOrderServiceServer(s, &Server{})
}
