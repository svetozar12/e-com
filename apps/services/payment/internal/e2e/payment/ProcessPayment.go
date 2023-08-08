package payment

import (
	"context"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	"svetozar12/e-com/v2/apps/services/payment/internal/app/entities"
	transactionRepository "svetozar12/e-com/v2/apps/services/payment/internal/app/repositories/paymentRepository"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
	"google.golang.org/grpc/metadata"
)

func TestProcessPayment(t *testing.T) {
	ctx := metadata.NewOutgoingContext(context.Background(), metadata.Pairs("userId", "12"))
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewPaymentServiceClient(conn)
	var transactionIds [2]uint
	validAmount := 1200
	mail := "test@abv.bg"
	invalidAmount := 12
	token := "tok_visa"
	t.Run("rpc ProcessPayment(expected behavior)", func(t *testing.T) {
		resp, err := client.ProcessPayment(ctx, &pb.PaymentRequest{Amount: float64(validAmount), Currency: pb.Currency_EUR, ReceiptEamil: mail, Token: token})
		if err != nil {
			t.Fatalf("ProcessPayment failed: %v", err)
		}
		transactionIds[0] = uint(resp.TransactionId)

		if int32(resp.Message) != int32(pb.PaymentStatus_PaymentSuccessful) {
			t.Fatalf(constants.InvalidFieldValueMessage("Message"))
		}
	})

	t.Run("rpc ProcessPayment(expected behavior failed payment)", func(t *testing.T) {
		resp, err := client.ProcessPayment(ctx, &pb.PaymentRequest{Amount: float64(invalidAmount), Currency: pb.Currency_EUR, ReceiptEamil: mail, Token: token})
		if err != nil {
			t.Fatalf("ProcessPayment failed: %v", err)
		}
		transactionIds[1] = uint(resp.TransactionId)

		if int32(resp.Message) != int32(pb.PaymentStatus_PaymentFailed) {
			t.Fatalf(constants.InvalidFieldValueMessage("Message"))
		}
	})

	t.Run("rpc UpdateInventory(invalid input)", func(t *testing.T) {
		_, err := client.ProcessPayment(ctx, &pb.PaymentRequest{Amount: float64(-1), Currency: pb.Currency_EUR, ReceiptEamil: "invalid_email", Token: token})

		if !strings.Contains(err.Error(), "ReceiptEamil: "+constants.InvalidEmailMessage) {
			t.Errorf(constants.InvalidFieldMessage("ReceiptEamil"))
		}
		if !strings.Contains(err.Error(), "Amount: "+constants.GTEValueMessage("0")) {
			t.Errorf(constants.InvalidFieldMessage("Amount"))
		}
	})

	t.Cleanup(func() {
		for _, value := range transactionIds {
			transactionRepository.HardDeleteTransaction(&entities.TransactionEntity{Model: entities.Model{ID: uint(value)}})
		}
	})
}
