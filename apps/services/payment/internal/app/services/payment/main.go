package payment

import (
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"

	"google.golang.org/grpc"
)

func InitPaymentService(s *grpc.Server) {
	pb.RegisterPaymentServiceServer(s, &Server{})
}
