package product

import (
	"context"
	"fmt"
	"io/ioutil"
	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/repositories/productRepository"

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
	fmt.Println(in.Image)
	// Create a temporary file within our temp-images directory that follows
	// a particular naming pattern
	tempFile, err := ioutil.TempFile("temp-images", "upload-*.png")
	if err != nil {
		fmt.Println(err)
	}
	defer tempFile.Close()

	// write this byte array to our temporary file
	tempFile.Write(in.Image)

	product, err := productRepository.CreateProduct(&entities.ProductEntity{Name: in.Name, Image: tempFile.Name(), Price: in.Price, Description: in.Description, Available: in.Available, Weight: in.Weight, Currency: in.Currency})

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
	// if in.Email != "" {
	// 	product.Email = in.Email
	// }
	// if in.Fname != "" {
	// 	product.Fname = in.Fname
	// }
	// if in.Lname != "" {
	// 	product.Lname = in.Lname
	// }
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
	productRepository.DeleteProduct(nil, "id = ?", in.Id)

	return &pb.Empty{}, nil
}
