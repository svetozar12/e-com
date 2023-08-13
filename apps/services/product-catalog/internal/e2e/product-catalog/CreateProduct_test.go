package productCatalog_test

import (
	"context"
	"io/ioutil"
	"log"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
	"gorm.io/gorm"
)

func TestAddInventory(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewProducCatalogServiceClient(conn)
	var productCatalog *pb.Product
	image, err := ioutil.ReadFile("test.png")
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}
	testProduct := &pb.CreateProductRequest{Name: "Test Product", Price: 20, Image: image, Description: "test product", Available: false, Weight: 900, Inventory: &pb.InventoryAvaliability{Id: 20, Value: 10}, Currency: "BGN"}
	t.Run("rpc CreateProduct(expected behavior)", func(t *testing.T) {
		resp, err := client.CreateProduct(ctx, testProduct)
		if err != nil {
			t.Fatalf("CreateProduct failed: %v", err)
		}
		productCatalog = resp

		if resp.Name != testProduct.Name {
			t.Fatalf(constants.InvalidFieldValueMessage("Name"))
		}
	})

	t.Cleanup(func() {
		// delete images created by file upload service
		productRepository.HardDeleteProduct(&entities.ProductEntity{Model: gorm.Model{ID: uint(productCatalog.Id)}})
	})
}
