package entities

import "gorm.io/gorm"

type CartEntity struct {
	gorm.Model
	ProductId uint
	UserId    uint
	Quantity  int32  `json:"quantity,omitempty"`
	Currency  string `json:"currency,omitempty"`
}

// TableName overrides the table name used by User to `profiles`
func (CartEntity) TableName() string {
	return "Cart"
}
