package notification

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/notification/dist/proto"
	"svetozar12/e-com/v2/apps/services/notification/internal/pkg/constants"

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

func sendNotification(ctx context.Context, in *pb.SendNotificationRequest) (*pb.SendNotificationResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	notification, err := sendNotificationUtil(in)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	return &pb.SendNotificationResponse{Id: int32(notification.ID), Message: constants.NotificationWasSent}, nil
}
