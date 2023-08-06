package payment

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	"svetozar12/e-com/v2/apps/services/payment/internal/pkg/env"

	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// ChargeJSON incoming data for Stripe API
type ChargeJSON struct {
	Amount       int64  `json:"amount"`
	ReceiptEmail string `json:"receiptEmail"`
}

func processPayment(ctx context.Context, in *pb.PaymentRequest) (*pb.PaymentResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	stripe.Key = env.Envs.StripeKey
	// Attempt to make the charge.
	// We are setting the charge response to _
	// as we are not using it.
	_, err = charge.New(&stripe.ChargeParams{
		Amount:   stripe.Int64(int64(in.Amount)),
		Currency: stripe.String(string(ProtoToStripeCurrency(in.Currency))),
		// tok_visa for testing
		Source:       &stripe.SourceParams{Token: stripe.String(in.Token)}, // this should come from clientside
		ReceiptEmail: stripe.String(in.ReceiptEamil)})
	if err != nil {
		return nil, status.Error(codes.Canceled, "payment failed")
	}
	return &pb.PaymentResponse{Message: "good"}, nil
}
