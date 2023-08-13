package entities

import "gorm.io/gorm"

type Notification struct {
	gorm.Model
	Title     string `gorm:"not null"`
	Content   string `gorm:"not null"`
	Type      string `gorm:"not null"`
	Recipient string `gorm:"not null"`
	Read      bool   `gorm:"not null"`
}
