package payment

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
)

type Server struct {
	pb.UnimplementedPaymentServiceServer
}

func (s *Server) ProcessPayment(ctx context.Context, in *pb.PaymentRequest) (*pb.PaymentResponse, error) {
	return processPayment(ctx, in)
}
