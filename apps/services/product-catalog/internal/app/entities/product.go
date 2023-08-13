package entities

import "gorm.io/gorm"

type ProductEntity struct {
	gorm.Model
	Name        string `json:"name" binding:"required"`
	Price       int32  `json:"price" binding:"required"`
	Image       string `json:"image" binding:"required"`
	Description string `json:"description" binding:"required"`
	Available   bool   `json:"available" binding:"required"`
	Weight      int32  `json:"weight" binding:"required"`
	InventoryId uint
	Inventory   InventoryEntity `json:"inventory" gorm:"foreignKey:InventoryId;references:ID"`
	Currency    string          `json:"currency" binding:"required"`
}

type Tabler interface {
	TableName() string
}

// TableName overrides the table name used by User to `profiles`
func (ProductEntity) TableName() string {
	return "Product"
}
