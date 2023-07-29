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

func TestUpdateInventory(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewInventoryServiceClient(conn)
	var inventory *pb.Inventory
	productId := 1
	initialQuantity := 10
	newQuantity := 30
	inventoryrepository.CreateInventory(&entities.InventoryEntity{ProductId: uint(productId), AvailableQuantity: int32(initialQuantity)})
	t.Run("rpc UpdateInventory(expected behavior)", func(t *testing.T) {
		resp, err := client.UpdateInventory(ctx, &pb.UpdateInventoryRequest{ProductId: int32(productId), NewQuantity: int32(newQuantity)})
		if err != nil {
			t.Fatalf("UpdateInventory failed: %v", err)
		}
		inventory = resp

		if resp.ProductId != int32(productId) {
			t.Fatalf(constants.InvalidFieldValueMessage("ProductId"))
		}
		if resp.AvailableQuantity == int32(initialQuantity) || resp.AvailableQuantity != int32(newQuantity) {
			t.Fatalf(constants.InvalidFieldValueMessage("initialQuantity"))
		}
	})

	t.Run("rpc UpdateInventory(invalid input)", func(t *testing.T) {
		_, err := client.UpdateInventory(ctx, &pb.UpdateInventoryRequest{ProductId: 0, NewQuantity: 0})
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
