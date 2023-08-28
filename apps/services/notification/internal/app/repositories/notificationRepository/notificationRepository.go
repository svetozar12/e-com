package notificationRepository

import (
	"svetozar12/e-com/v2/apps/services/notification/internal/app/databases/postgres"
	"svetozar12/e-com/v2/libs/api/entities"
)

func GetNotification(notification *entities.NotificationEntity) (*entities.NotificationEntity, error) {
	err := postgres.DB.First(notification).Error
	return notification, err
}

func GetNotificationList(notificationIds []string, args ...interface{}) ([]entities.NotificationEntity, error) {
	inventories := []entities.NotificationEntity{}
	err := postgres.DB.Where("id in (?)", notificationIds, args).Find(&inventories).Error
	return inventories, err
}

func CreateNotification(notification *entities.NotificationEntity) (*entities.NotificationEntity, error) {
	err := postgres.DB.Create(notification).Error
	return notification, err
}

func UpdateNotification(notification *entities.NotificationEntity) (*entities.NotificationEntity, error) {
	err := postgres.DB.Save(notification).Error
	return notification, err
}

func DeleteNotification(notification *entities.NotificationEntity) (*entities.NotificationEntity, error) {
	err := postgres.DB.Delete(&notification).Error
	return notification, err
}

func HardDeleteNotification(notification *entities.NotificationEntity) (*entities.NotificationEntity, error) {
	err := postgres.DB.Unscoped().Delete(&notification).Error
	return notification, err
}
