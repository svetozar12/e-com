package notification

import (
	"fmt"
	"net/smtp"
	pb "svetozar12/e-com/v2/api/v1/notification/dist/proto"
	"svetozar12/e-com/v2/apps/services/notification/internal/app/repositories/notificationRepository"
	"svetozar12/e-com/v2/apps/services/notification/internal/pkg/env"
	"svetozar12/e-com/v2/libs/api/entities"
)

func sendNotificationUtil(in *pb.SendNotificationRequest) (*entities.NotificationEntity, error) {
	isNotificationRead := false
	err := sendSmtpEmail(in)
	if err != nil {
		return nil, err
	}

	notification, err := notificationRepository.CreateNotification(PBToNotificationEntity(in, isNotificationRead))
	if err != nil {
		return nil, err
	}
	return notification, err
}

func sendSmtpEmail(in *pb.SendNotificationRequest) error {
	from := env.Envs.EMAIL
	password := env.Envs.PASSWORD

	host := "smtp.gmail.com"
	port := 587

	// Connect to the SMTP server.
	auth := smtp.PlainAuth("", from, password, host)
	to := []string{in.Recipient}
	msg := []byte("To: " + in.Recipient + "\r\n" +
		"Subject: " + in.Title + "\r\n" + in.Content +
		"\r\n" + "\r\n")
	err := smtp.SendMail(fmt.Sprintf("%s:%d", host, port), auth, from, to, msg)
	return err
}
