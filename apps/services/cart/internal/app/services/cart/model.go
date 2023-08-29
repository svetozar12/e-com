package cart

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	pbProduct "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	grpcclients "svetozar12/e-com/v2/apps/services/cart/internal/pkg/grpc-clients"
	"svetozar12/e-com/v2/libs/api/entities"
)

func ConvertToPBCart(cart *entities.CartEntity, ctx context.Context) *pb.CartItem {
	product, _ := grpcclients.ProductClient.GetProduct(ctx, &pbProduct.GetProductRequest{Id: int32(cart.ProductId)})

	return &pb.CartItem{ProductId: int32(cart.ID), Quantity: cart.Quantity, PricePerItem: product.Price, Currency: product.Currency}
}

func ConvertArrayToPBCarts(cartEntities []entities.CartEntity, ctx context.Context) []*pb.CartItem {
	var pbEntities []*pb.CartItem
	for _, cartEntity := range cartEntities {
		pbEntity := ConvertToPBCart(&cartEntity, ctx)
		pbEntities = append(pbEntities, pbEntity)
	}

	return pbEntities
}
