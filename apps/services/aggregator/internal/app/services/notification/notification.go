package notification

import (
	"context"
	"fmt"
	notificationPb "svetozar12/e-com/v2/api/v1/notification/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToNotificationService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING NOTIFICATION SERVICE")
	err := notificationPb.RegisterNotificationServiceHandlerFromEndpoint(context.Background(), gwmux, env.Envs.NOTIFICATION_SERVICE_ADDRESS, opts)
	if err != nil {
		return err
	}

	return nil
}
