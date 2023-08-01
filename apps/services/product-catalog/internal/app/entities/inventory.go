package entities

type InventoryEntity struct {
	Model
	ProductId         uint
	AvailableQuantity int32 `json:"availableQuantity,omitempty"`
}
