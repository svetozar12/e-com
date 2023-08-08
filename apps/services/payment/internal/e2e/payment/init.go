package payment

import (
	"context"
	"log"
	"net"

	"svetozar12/e-com/v2/apps/services/payment/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/payment/internal/app/services/payment"
	"svetozar12/e-com/v2/apps/services/payment/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"
)

const bufSize = 1024 * 1024

var lis *bufconn.Listener

func init() {
	env.InitConfig()
	postgres.InitPostgres()
	lis = bufconn.Listen(bufSize)
	s := grpc.NewServer()
	payment.InitPaymentService(s)
	go func() {
		if err := s.Serve(lis); err != nil {
			log.Fatalf("Server exited with error: %v", err)
		}
	}()
}

func bufDialer(context.Context, string) (net.Conn, error) {
	return lis.Dial()
}
