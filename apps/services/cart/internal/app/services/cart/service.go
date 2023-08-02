package cart

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	"svetozar12/e-com/v2/apps/services/cart/internal/app/entities"
	cartRepository "svetozar12/e-com/v2/apps/services/cart/internal/app/repositories/productRepository"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getShoppingCart(ctx context.Context, in *pb.GetShoppingCartRequest) (*pb.GetShoppingCartResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	carts, err := cartRepository.GetCartList(&entities.CartEntity{UserId: uint(in.UserId)})
	resp, totalPrice, err := getCartTotalPrice(carts, ctx)
	if err != nil {
		return nil, err
	}
	if resp != nil {
		return &pb.GetShoppingCartResponse{Cart: resp}, nil
	}

	return &pb.GetShoppingCartResponse{Cart: &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}}, nil
}

func addToCart(ctx context.Context, in *pb.AddToCartRequest) (*pb.AddToCartResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	err = validateCreateProduct(ctx, in)
	if err != nil {
		return nil, err
	}

	err = addCartItem(ctx, in)
	if err != nil {
		return nil, err
	}
	carts, err := cartRepository.GetCartList(&entities.CartEntity{UserId: uint(in.UserId)})
	resp, totalPrice, err := getCartTotalPrice(carts, ctx)
	if resp != nil {
		return &pb.AddToCartResponse{Cart: resp}, nil
	}
	if err != nil {
		return nil, err
	}
	return &pb.AddToCartResponse{Cart: &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}}, nil
}

func updateCartItem(ctx context.Context, in *pb.UpdateCartItemRequest) (*pb.UpdateCartItemResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	err = validateUpdateProduct(ctx, in)
	if err != nil {
		return nil, err
	}
	err = updateItem(ctx, in)
	if err != nil {
		return nil, err
	}
	carts, err := cartRepository.GetCartList(&entities.CartEntity{UserId: uint(in.UserId)})
	resp, totalPrice, err := getCartTotalPrice(carts, ctx)
	if resp != nil {
		return &pb.UpdateCartItemResponse{Cart: resp}, nil
	}
	if err != nil {
		return nil, err
	}
	return &pb.UpdateCartItemResponse{Cart: &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}}, nil
}
