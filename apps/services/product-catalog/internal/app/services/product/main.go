package product

import (
	pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"

	"google.golang.org/grpc"
)

func InitProductService(s *grpc.Server) {
	pb.RegisterProducCatalogServiceServer(s, &Server{})
}
