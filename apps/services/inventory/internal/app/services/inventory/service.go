package inventory

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/inventoryRepository"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getInventory(ctx context.Context, in *pb.GetInventoryRequest) (*pb.Inventory, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	inventory, err := getInventoryByProductId(in.ProductId)
	if err != nil {
		return nil, err
	}
	return ConvertToPBInventory(inventory), nil
}

func addInventory(ctx context.Context, in *pb.AddInventoryRequest) (*pb.Inventory, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	inventory, err := inventoryRepository.CreateInventory(&entities.InventoryEntity{ProductId: uint(in.ProductId), AvailableQuantity: in.InitialQuantity})
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.InventoryNotFound)
	}

	return ConvertToPBInventory(inventory), nil
}

func updateInventory(ctx context.Context, in *pb.UpdateInventoryRequest) (*pb.Inventory, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	updatedInventory, err := updateInventoryUtil(in)
	if err != nil {
		return nil, err
	}

	return ConvertToPBInventory(updatedInventory), nil
}
