package notification

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/notification/dist/proto"
)

type Server struct {
	pb.UnimplementedNotificationServiceServer
}

func (s *Server) SendNotification(ctx context.Context, in *pb.SendNotificationRequest) (*pb.SendNotificationResponse, error) {
	return sendNotification(ctx, in)
}
