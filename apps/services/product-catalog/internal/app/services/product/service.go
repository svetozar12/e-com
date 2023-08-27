package product

import (
	"context"
	"encoding/base64"
	"fmt"
	inventory_service "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/messaging/rabbitmq"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/messaging/rabbitmq/publishers/fileUploadPublishers"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/constants"
	grpcclients "svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/grpc-clients"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

func getProduct(ctx context.Context, in *pb.GetProductRequest) (*pb.Product, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	product, err := productRepository.GetProduct("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
	}
	return ProductModel(product), nil
}

func createProduct(ctx context.Context, in *pb.CreateProductRequest) (*pb.ProductResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	channel, err := rabbitmq.GetRabbitMQChannel()
	if err != nil {
		return nil, err
	}
	// TODO do transaction here if any of actions bellow fail revert changes in database
	product, err := productRepository.CreateProduct(&entities.ProductEntity{Name: in.Name, Price: in.Price, Description: in.Description, Available: in.Available, Weight: in.Weight, Currency: in.Currency})
	if err != nil {
		return &pb.ProductResponse{ProductId: int32(product.ID), Status: pb.Status_FAILED, Action: pb.Action_CREATE}, status.Error(codes.Aborted, constants.ProductNotCreated)
	}
	fileData := make(map[string]any)
	fileData["Id"] = product.ID
	fileData["Image"] = base64.StdEncoding.EncodeToString(in.Image)
	err = fileUploadPublishers.UploadFileMessage(channel, fileData)
	if err != nil {
		return nil, err
	}

	res, err := grpcclients.InventoryClient.AddInventory(ctx, &inventory_service.AddInventoryRequest{ProductId: int32(product.ID), InitialQuantity: in.Inventory.Value})
	if err != nil {
		fmt.Println(err, "GREGORI")
		return nil, status.Error(codes.Aborted, constants.InventoryNotUpdated)
	}
	_, err = productRepository.UpdateProduct(&entities.ProductEntity{Inventory: entities.InventoryEntity{AvailableQuantity: res.AvailableQuantity, Model: gorm.Model{ID: uint(res.Id)}}})
	if err != nil {
		return nil, status.Error(codes.Aborted, constants.InventoryNotUpdated)
	}
	return &pb.ProductResponse{ProductId: int32(product.ID), Status: pb.Status_SUCCESSFUL, Action: pb.Action_CREATE}, nil
}

func updateProduct(ctx context.Context, in *pb.UpdateProductRequest) (*pb.ProductResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	channel, err := rabbitmq.GetRabbitMQChannel()
	if err != nil {
		return nil, err
	}
	product, err := productRepository.GetProduct("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.ProductNotFound)
	}
	// adjust for product
	if *in.Name != product.Name {
		product.Name = *in.Name
	}
	if *in.Price != product.Price {
		product.Price = *in.Price
	}
	for _, v := range in.Image {
		if v != 0 {
			fileUploadPublishers.DeleteFileMessage(channel, product.Image)
			fileData := make(map[string]any)
			fileData["Id"] = product.ID
			fileData["Image"] = base64.StdEncoding.EncodeToString(in.Image)
			err = fileUploadPublishers.UploadFileMessage(channel, fileData)

			break
		}
	}

	if *in.Description != product.Description {
		product.Description = *in.Description
	}
	if *in.Available != product.Available {
		product.Name = *in.Name
	}
	if *in.Weight != product.Weight {
		product.Weight = *in.Weight
	}
	if *in.Currency != product.Currency {
		product.Currency = *in.Currency
	}

	updatedproduct, err := productRepository.UpdateProduct(product)
	if err != nil {
		return &pb.ProductResponse{ProductId: int32(updatedproduct.ID), Status: pb.Status_FAILED, Action: pb.Action_UPDATE}, status.Error(codes.Aborted, constants.ProductNotUpdated)
	}
	return &pb.ProductResponse{ProductId: int32(updatedproduct.ID), Status: pb.Status_SUCCESSFUL, Action: pb.Action_UPDATE}, nil
}

func deleteProduct(ctx context.Context, in *pb.DeleteProductRequest) (*pb.ProductResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	channel, err := rabbitmq.GetRabbitMQChannel()
	if err != nil {
		return nil, err
	}
	product, err := productRepository.GetProduct("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.ProductNotFound)
	}

	// TODO: Perform transaction if DeleteImage fails don't delete product
	_, err = productRepository.DeleteProduct(&entities.ProductEntity{Model: gorm.Model{ID: uint(in.Id)}})
	if err != nil {
		return &pb.ProductResponse{ProductId: int32(product.ID), Status: pb.Status_FAILED, Action: pb.Action_DELETE}, status.Error(codes.Aborted, constants.ProductNotDeleted)
	}
	fileUploadPublishers.DeleteFileMessage(channel, product.Image)

	return &pb.ProductResponse{ProductId: int32(product.ID), Status: pb.Status_SUCCESSFUL, Action: pb.Action_DELETE}, nil
}
