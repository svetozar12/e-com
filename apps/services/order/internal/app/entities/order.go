package entities

import (
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"

	"gorm.io/gorm"
)

type OrderEntity struct {
	gorm.Model
	UserID          int32  `gorm:"not null"`
	ShippingAddress string `gorm:"not null"`
	Status          pb.OrderStatus
	Items           []ItemEntity `gorm:"constraint:OnDelete:CASCADE;"`
}

type ItemEntity struct {
	gorm.Model
	OrderID   uint
	ProductID int32 `gorm:"not null"`
	Quantity  int32 `gorm:"not null"`
}

type Tabler interface {
	TableName() string
}

// TableName overrides the table name used by User to `profiles`
func (OrderEntity) TableName() string {
	return "Order"
}
