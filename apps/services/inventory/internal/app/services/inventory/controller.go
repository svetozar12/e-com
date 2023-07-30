package inventory

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
)

type Server struct {
	pb.UnimplementedInventoryServiceServer
}

func (s *Server) GetInventory(ctx context.Context, in *pb.GetInventoryRequest) (*pb.Inventory, error) {
	return getInventory(ctx, in)
}

func (s *Server) AddInventory(ctx context.Context, in *pb.AddInventoryRequest) (*pb.Inventory, error) {
	return addInventory(ctx, in)
}

func (s *Server) UpdateInventory(ctx context.Context, in *pb.UpdateInventoryRequest) (*pb.Inventory, error) {
	return updateInventory(ctx, in)
}
