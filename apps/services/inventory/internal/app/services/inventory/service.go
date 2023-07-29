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
	inventory, err := inventoryRepository.GetInventory("product_id = ?", in.ProductId)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.InventoryNotFound)
	}
	return &pb.Inventory{Id: int32(inventory.ID), ProductId: int32(inventory.ProductId), AvailableQuantity: inventory.AvailableQuantity}, nil
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

	return &pb.Inventory{Id: int32(inventory.ID), ProductId: int32(inventory.ProductId), AvailableQuantity: inventory.AvailableQuantity}, nil
}

func updateInventory(ctx context.Context, in *pb.UpdateInventoryRequest) (*pb.Inventory, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	inventory, err := inventoryRepository.GetInventory("id = ?", in.ProductId)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.InventoryNotFound)
	}

	if in.NewQuantity != inventory.AvailableQuantity {
		inventory.AvailableQuantity = in.NewQuantity
	}

	updatedInventory, err := inventoryRepository.UpdateInventory(inventory)
	if err != nil {
		return nil, status.Error(codes.Internal, constants.InventoryNotUpdated)
	}
	return &pb.Inventory{Id: int32(updatedInventory.ID), ProductId: int32(updatedInventory.ProductId), AvailableQuantity: updatedInventory.AvailableQuantity}, nil
}
