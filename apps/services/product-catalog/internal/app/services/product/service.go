package product

import (
	"context"
	pbFileUpload "svetozar12/e-com/v2/api/v1/file-upload/dist/proto"
	inventory_service "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"
	grpcclients "svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/grpc-clients"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getProduct(ctx context.Context, in *pb.GetProductRequest) (*pb.Product, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	user, err := productRepository.GetProduct("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
	}
	return ProductModel(user), nil
}

func createProduct(ctx context.Context, in *pb.CreateProductRequest) (*pb.Product, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}

	uploadImageRes, uploadImageErr := grpcclients.FileUploadClient.UploadImage(ctx, &pbFileUpload.ImageUploadRequest{ImageData: in.Image})

	if uploadImageErr != nil {
		return nil, uploadImageErr
	}
	product, err := productRepository.CreateProduct(&entities.ProductEntity{Name: in.Name, Image: uploadImageRes.FileId, Price: in.Price, Description: in.Description, Available: in.Available, Weight: in.Weight, Currency: in.Currency})
	grpcclients.InventoryClient.AddInventory(ctx, &inventory_service.AddInventoryRequest{ProductId: int32(product.ID), InitialQuantity: in.Inventory.Value})

	return ProductModel(product), nil
}

func updateProduct(ctx context.Context, in *pb.UpdateProductRequest) (*pb.Product, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	product, err := productRepository.GetProduct("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
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
			_, deleteImageErr := grpcclients.FileUploadClient.DeleteImage(ctx, &pbFileUpload.DeleteImageRequest{Id: product.Image})

			if deleteImageErr != nil {
				return nil, deleteImageErr
			}
			uploadImageRes, uploadImageErr := grpcclients.FileUploadClient.UploadImage(ctx, &pbFileUpload.ImageUploadRequest{ImageData: in.Image})

			if uploadImageErr != nil {
				return nil, uploadImageErr
			}
			product.Image = uploadImageRes.FileId
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

	updatedUser, err := productRepository.UpdateProduct(product)
	if err != nil {
		return nil, status.Error(codes.Internal, "")
	}
	return ProductModel(updatedUser), nil
}

func deleteProduct(ctx context.Context, in *pb.DeleteProductRequest) (*pb.Empty, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	product, err := productRepository.GetProduct("id = ?", in.Id)
	if err != nil {
		return nil, status.Error(codes.NotFound, "")
	}

	// TODO: Perform transaction if DeleteImage fails don't delete product
	_, err = productRepository.DeleteProduct(nil, "id = ?", in.Id)
	_, deleteImageErr := grpcclients.FileUploadClient.DeleteImage(ctx, &pbFileUpload.DeleteImageRequest{Id: product.Image})

	if deleteImageErr != nil {
		return nil, deleteImageErr
	}
	return &pb.Empty{}, nil
}
