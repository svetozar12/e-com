package notification

import (
	pb "svetozar12/e-com/v2/api/v1/notification/dist/proto"

	"google.golang.org/grpc"
)

func InitNotificationService(s *grpc.Server) {
	pb.RegisterNotificationServiceServer(s, &Server{})
}
