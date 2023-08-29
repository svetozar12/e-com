package inventory

import (
	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/libs/api/entities"
)

func ConvertToPBInventory(inventory *entities.InventoryEntity) *pb.Inventory {

	return &pb.Inventory{
		Id:                int32(inventory.ID),
		ProductId:         int32(inventory.ProductId),
		AvailableQuantity: inventory.AvailableQuantity}
}
