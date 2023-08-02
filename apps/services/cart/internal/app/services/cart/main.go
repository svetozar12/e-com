package cart

import (
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"

	"google.golang.org/grpc"
)

func InitCartService(s *grpc.Server) {
	pb.RegisterCartServiceServer(s, &Server{})
}
