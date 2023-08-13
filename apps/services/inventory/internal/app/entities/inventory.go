package entities

import "gorm.io/gorm"

type InventoryEntity struct {
	gorm.Model
	ProductId         uint
	AvailableQuantity int32 `json:"availableQuantity,omitempty"`
}

type Tabler interface {
	TableName() string
}

// TableName overrides the table name used by User to `profiles`
func (InventoryEntity) TableName() string {
	return "Inventory"
}
