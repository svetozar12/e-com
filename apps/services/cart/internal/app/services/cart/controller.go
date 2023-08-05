package cart

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
)

type Server struct {
	pb.UnimplementedCartServiceServer
}

func (s *Server) GetShoppingCart(ctx context.Context, in *pb.GetShoppingCartRequest) (*pb.ShoppingCart, error) {
	return getShoppingCart(ctx, in)
}

func (s *Server) AddToCart(ctx context.Context, in *pb.AddToCartRequest) (*pb.ShoppingCart, error) {
	return addToCart(ctx, in)
}

func (s *Server) UpdateCartItem(ctx context.Context, in *pb.UpdateCartItemRequest) (*pb.ShoppingCart, error) {
	return updateCartItem(ctx, in)
}

func (s *Server) RemoveCartItem(ctx context.Context, in *pb.RemoveCartItemRequest) (*pb.ShoppingCart, error) {
	return removeCartItem(ctx, in)
}
