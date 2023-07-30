package inventory_test

import (
	"context"
	"fmt"
	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/entities"
	inventoryrepository "svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/inventoryRepository"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
)

func TestAddInventory(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewInventoryServiceClient(conn)
	var inventory *pb.Inventory
	productId := 1
	initialQuantity := 20
	t.Run("rpc AddInventory(expected behavior)", func(t *testing.T) {
		resp, err := client.AddInventory(ctx, &pb.AddInventoryRequest{ProductId: int32(productId), InitialQuantity: int32(initialQuantity)})
		if err != nil {
			t.Fatalf("AddInventory failed: %v", err)
		}
		inventory = resp

		if resp.ProductId != int32(productId) {
			t.Fatalf(constants.InvalidFieldValueMessage("ProductId"))
		}
		if resp.AvailableQuantity != int32(initialQuantity) {
			t.Fatalf(constants.InvalidFieldValueMessage("initialQuantity"))
		}
	})

	t.Run("rpc AddInventory(invalid input)", func(t *testing.T) {
		_, err := client.AddInventory(ctx, &pb.AddInventoryRequest{ProductId: 0, InitialQuantity: 0})
		fmt.Println(err.Error())
		if !strings.Contains(err.Error(), "ProductId: "+constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("productId"))
		}
		if !strings.Contains(err.Error(), "InitialQuantity: "+constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("initialQuantity"))
		}
	})

	t.Cleanup(func() {
		inventoryrepository.DeleteInventory(&entities.InventoryEntity{Model: entities.Model{ID: uint(inventory.Id)}})
	})
}
