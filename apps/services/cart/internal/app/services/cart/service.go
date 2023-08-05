package cart

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	"svetozar12/e-com/v2/apps/services/cart/internal/app/entities"
	cartRepository "svetozar12/e-com/v2/apps/services/cart/internal/app/repositories/productRepository"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getShoppingCart(ctx context.Context, in *pb.GetShoppingCartRequest) (*pb.ShoppingCart, error) {
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
		return resp, nil
	}

	return &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}, nil
}

func addToCart(ctx context.Context, in *pb.AddToCartRequest) (*pb.ShoppingCart, error) {
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
		return resp, nil
	}
	if err != nil {
		return nil, err
	}
	return &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}, nil
}

func updateCartItem(ctx context.Context, in *pb.UpdateCartItemRequest) (*pb.ShoppingCart, error) {
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
		return resp, nil
	}
	if err != nil {
		return nil, err
	}
	return &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}, nil
}

func removeCartItem(ctx context.Context, in *pb.RemoveCartItemRequest) (*pb.ShoppingCart, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	err = validateRemoveProduct(ctx, in)
	if err != nil {
		return nil, err
	}
	err = removeItem(ctx, in)
	if err != nil {
		return nil, err
	}
	carts, err := cartRepository.GetCartList(&entities.CartEntity{UserId: uint(in.UserId)})
	resp, totalPrice, err := getCartTotalPrice(carts, ctx)
	if resp != nil {
		return resp, nil
	}
	if err != nil {
		return nil, err
	}
	return &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}, nil
}
