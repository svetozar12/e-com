package product

import (
	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/app/entities"
)

func ProductModel(product *entities.ProductEntity) *pb.Product {
	return &pb.Product{Id: int32(product.ID), Name: product.Name, Price: product.Price, Description: product.Description, Available: product.Available, Weight: product.Weight, Currency: product.Currency}
}
