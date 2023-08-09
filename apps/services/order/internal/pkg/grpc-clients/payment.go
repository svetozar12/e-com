package grpcClients

import (
	"fmt"
	pbPayment "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	"svetozar12/e-com/v2/apps/services/order/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var PaymentClient pbPayment.PaymentServiceClient

func initPaymentClient() {
	conn, err := grpc.Dial(env.Envs.PAYMENT_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		fmt.Errorf("Failed to dial bufnet: %v", err)
	}
	client := pbPayment.NewPaymentServiceClient(conn)
	PaymentClient = client
	fmt.Println("Payment client READY")
}
