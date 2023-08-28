package payment

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	transactionRepository "svetozar12/e-com/v2/apps/services/payment/internal/app/repositories/paymentRepository"
	"svetozar12/e-com/v2/libs/api/entities"

	"google.golang.org/grpc/codes"
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
	userId, err := getUserIdFromContext(ctx)
	if err != nil {
		return nil, err
	}
	err = processPaymentUtil(in, ctx)
	if err != nil {
		transaction, _ := transactionRepository.CreateTransaction(&entities.TransactionEntity{UserId: uint(userId), Amount: int32(in.Amount), Currency: in.Currency.String(), Status: pb.PaymentStatus_PaymentFailed.String()})

		return ConvertToPBPayment(transaction, pb.PaymentStatus_PaymentFailed), nil
	}
	transaction, _ := transactionRepository.CreateTransaction(&entities.TransactionEntity{UserId: uint(userId), Amount: int32(in.Amount), Currency: in.Currency.String(), Status: pb.PaymentStatus_PaymentSuccessful.String()})
	return ConvertToPBPayment(transaction, pb.PaymentStatus_PaymentSuccessful), nil
}
