package payment

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func processPayment(ctx context.Context, in *pb.PaymentRequest) (*pb.PaymentResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	return &pb.PaymentResponse{}, nil
}
