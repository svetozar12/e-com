package inventory

import (
	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/inventoryRepository"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"
	"svetozar12/e-com/v2/libs/api/entities"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getInventoryByProductId(productId int32) (*entities.InventoryEntity, error) {

	inventory, err := inventoryRepository.GetInventory("product_id = ?", productId)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.InventoryNotFound)
	}
	return inventory, nil
}

func updateInventoryUtil(in *pb.UpdateInventoryRequest) (*entities.InventoryEntity, error) {
	inventory, err := getInventoryByProductId(in.ProductId)
	if err != nil {
		return nil, err
	}

	if in.NewQuantity != inventory.AvailableQuantity {
		inventory.AvailableQuantity = in.NewQuantity
	}

	updatedInventory, err := inventoryRepository.UpdateInventory(inventory)
	if err != nil {
		return nil, status.Error(codes.Internal, constants.InventoryNotUpdated)
	}
	return updatedInventory, err
}
