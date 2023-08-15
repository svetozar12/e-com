package entities

import "gorm.io/gorm"

type InventoryEntity struct {
	gorm.Model
	ProductId         uint
	AvailableQuantity int32 `json:"availableQuantity,omitempty"`
}
