package entities

import "gorm.io/gorm"

type NotificationEntity struct {
	gorm.Model
	Title     string `gorm:"not null"`
	Content   string `gorm:"not null"`
	Type      string `gorm:"not null"`
	Recipient string `gorm:"not null"`
	Read      bool   `gorm:"not null"`
}

// TableName overrides the table name used by User to `profiles`
func (NotificationEntity) TableName() string {
	return "Notification"
}
