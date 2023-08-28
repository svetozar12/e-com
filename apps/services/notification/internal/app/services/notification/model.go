package notification

import (
	pb "svetozar12/e-com/v2/api/v1/notification/dist/proto"
	"svetozar12/e-com/v2/libs/api/entities"
)

func PBToNotificationEntity(pbNotification *pb.SendNotificationRequest, read bool) *entities.NotificationEntity {
	return &entities.NotificationEntity{
		Title:     pbNotification.Title,
		Content:   pbNotification.Content,
		Type:      pbNotification.Type.String(),
		Recipient: pbNotification.Recipient,
		Read:      read,
	}
}
