package entities

import (
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	UserID          int32  `gorm:"not null"`
	ShippingAddress string `gorm:"not null"`
	Status          pb.OrderStatus
	Items           []Item `gorm:"constraint:OnDelete:CASCADE;"`
}

type Item struct {
	gorm.Model
	OrderID   uint
	ProductID int32 `gorm:"not null"`
	Quantity  int32 `gorm:"not null"`
}
