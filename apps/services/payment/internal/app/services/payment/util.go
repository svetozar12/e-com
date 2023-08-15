package payment

import (
	"context"
	"strconv"
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	"svetozar12/e-com/v2/apps/services/payment/internal/pkg/env"

	"github.com/stripe/stripe-go"
	"github.com/stripe/stripe-go/charge"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

func ProtoToStripeCurrency(value pb.Currency) stripe.Currency {
	switch value {
	case pb.Currency_USD:
		return stripe.CurrencyUSD
	case pb.Currency_EUR:
		return stripe.CurrencyEUR
	case pb.Currency_GBP:
		return stripe.CurrencyGBP
	default:
		// Handle any unknown currency values, or return a default value.
		// In this example, we return USD as the default.
		return stripe.CurrencyUSD
	}
}

func processPaymentUtil(in *pb.PaymentRequest, ctx context.Context) error {

	stripe.Key = env.Envs.StripeKey
	// Attempt to make the charge.
	// We are setting the charge response to _
	// as we are not using it.
	_, err := charge.New(&stripe.ChargeParams{
		Amount:   stripe.Int64(int64(in.Amount)),
		Currency: stripe.String(string(ProtoToStripeCurrency(in.Currency))),
		// tok_visa for testing
		Source:       &stripe.SourceParams{Token: stripe.String(in.Token)}, // this should come from clientside
		ReceiptEmail: stripe.String(in.ReceiptEamil)})
	return err
}

func getUserIdFromContext(ctx context.Context) (int64, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return 0, status.Error(codes.Unauthenticated, "Failed to retrieve metadata from context")
	}
	userId, err := strconv.ParseInt(md.Get("userId")[0], 10, 64)
	if err != nil {
		return 0, status.Error(codes.Unauthenticated, "UserId is missing in context object")
	}
	return userId, nil
}
