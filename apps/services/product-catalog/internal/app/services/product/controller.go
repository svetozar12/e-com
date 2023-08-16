package product

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
)

type Server struct {
	pb.UnimplementedProducCatalogServiceServer
}

func (s *Server) GetProduct(ctx context.Context, in *pb.GetProductRequest) (*pb.Product, error) {
	return getProduct(ctx, in)
}

func (s *Server) CreateProduct(ctx context.Context, in *pb.CreateProductRequest) (*pb.ProductResponse, error) {
	return createProduct(ctx, in)
}

func (s *Server) UpdateProduct(ctx context.Context, in *pb.UpdateProductRequest) (*pb.ProductResponse, error) {
	return updateProduct(ctx, in)
}

func (s *Server) DeleteProduct(ctx context.Context, in *pb.DeleteProductRequest) (*pb.ProductResponse, error) {
	return deleteProduct(ctx, in)
}
