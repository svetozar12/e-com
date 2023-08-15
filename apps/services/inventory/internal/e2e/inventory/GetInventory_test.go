package inventory_test

import (
	"context"
	"fmt"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/entities"
	inventoryrepository "svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/inventoryRepository"
	inventoryConstants "svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

func TestGetInventory(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewInventoryServiceClient(conn)
	inventory, err := inventoryrepository.CreateInventory(&entities.InventoryEntity{ProductId: 1, AvailableQuantity: 10})
	t.Run("rpc GetInventory(expected behavior)", func(t *testing.T) {
		resp, err := client.GetInventory(ctx, &pb.GetInventoryRequest{ProductId: int32(inventory.ProductId)})
		if err != nil {
			t.Fatalf("GetInventory failed: %v", err)
		}

		if resp.AvailableQuantity != int32(inventory.AvailableQuantity) {
			t.Fatalf(constants.InvalidFieldValueMessage("availableQuantity"))
		}
		if resp.ProductId != int32(inventory.ProductId) {
			fmt.Println(resp.ProductId, inventory.ProductId, "error")
			t.Fatalf(constants.InvalidFieldValueMessage("ProductId"))
		}
	})

	t.Run("rpc GetInventory(invalid input)", func(t *testing.T) {
		_, err := client.GetInventory(ctx, &pb.GetInventoryRequest{ProductId: int32(0)})
		if !strings.Contains(err.Error(), constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("id"))
		}
	})

	t.Run("rpc GetInventory(not found)", func(t *testing.T) {
		_, err := client.GetInventory(ctx, &pb.GetInventoryRequest{ProductId: int32(99999)})

		if err.Error() != status.Error(codes.NotFound, inventoryConstants.InventoryNotFound).Error() {
			t.Errorf(err.Error())
		}
	})

	t.Cleanup(func() {
		inventoryrepository.DeleteInventory(&entities.InventoryEntity{Model: gorm.Model{ID: inventory.ID}})
	})
}
