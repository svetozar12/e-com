package payment

import (
	"context"
	"fmt"
	"strconv"
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	"svetozar12/e-com/v2/apps/services/payment/internal/app/entities"
	transactionRepository "svetozar12/e-com/v2/apps/services/payment/internal/app/repositories/paymentRepository"
	"svetozar12/e-com/v2/apps/services/payment/internal/pkg/env"

	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

// ChargeJSON incoming data for Stripe API
type ChargeJSON struct {
	Amount       int64  `json:"amount"`
	ReceiptEmail string `json:"receiptEmail"`
}

type contextKey string

const userIDKey contextKey = "userid"

func processPayment(ctx context.Context, in *pb.PaymentRequest) (*pb.PaymentResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("Failed to retrieve metadata from context")
	}
	userId, err := strconv.ParseInt(md.Get("userId")[0], 10, 64)
	if err != nil {
		return nil, status.Error(codes.Canceled, "UserId is missing in context object")
	}
	fmt.Println(env.Envs.StripeKey, "TOKEN")
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
		transaction, _ := transactionRepository.CreateTransaction(&entities.TransactionEntity{UserId: uint(userId), Amount: int32(in.Amount), Currency: in.Currency.String(), Status: pb.PaymentStatus_PaymentFailed.String()})
		return &pb.PaymentResponse{Message: pb.PaymentStatus_PaymentFailed, TransactionId: int32(transaction.ID)}, nil
	}
	transaction, _ := transactionRepository.CreateTransaction(&entities.TransactionEntity{UserId: uint(userId), Amount: int32(in.Amount), Currency: in.Currency.String(), Status: pb.PaymentStatus_PaymentSuccessful.String()})
	return &pb.PaymentResponse{Message: pb.PaymentStatus_PaymentSuccessful, TransactionId: int32(transaction.ID)}, nil
}
