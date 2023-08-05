package cart

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	product_catalog_service "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/cart/internal/app/entities"
	cartRepository "svetozar12/e-com/v2/apps/services/cart/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/apps/services/cart/internal/pkg/constants"
	grpcclients "svetozar12/e-com/v2/apps/services/cart/internal/pkg/grpc-clients"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func validateCreateProduct(ctx context.Context, in *pb.AddToCartRequest) error {

	exists, _ := cartRepository.GetCart(&entities.CartEntity{ProductId: uint(in.ProductId), UserId: uint(in.UserId)})
	if exists.ID != 0 {
		return status.Error(codes.AlreadyExists, constants.CartAlreadyExits)
	}
	return nil
}

func validateUpdateProduct(ctx context.Context, in *pb.UpdateCartItemRequest) error {

	return nil
}

func validateRemoveProduct(ctx context.Context, in *pb.RemoveCartItemRequest) error {
	_, err := cartRepository.GetCart(&entities.CartEntity{ProductId: uint(in.ProductId), UserId: uint(in.UserId)})
	if err != nil {
		return status.Error(codes.AlreadyExists, constants.CartNotFound)
	}
	return nil
}

func getCartTotalPrice(carts []entities.CartEntity, ctx context.Context) (*pb.ShoppingCart, int, error) {
	totalPrice := 0
	if len(carts) == 0 {
		return &pb.ShoppingCart{Items: ConvertArrayToPBCarts(carts, ctx), TotalPrice: int32(totalPrice)}, totalPrice, nil
	}
	for i := 0; i < len(carts); i++ {
		product, err := grpcclients.ProductClient.GetProduct(ctx, &product_catalog_service.GetProductRequest{Id: int32(carts[i].ProductId)})
		if err != nil {
			return nil, totalPrice, err
		}
		totalPrice = totalPrice + int(product.Price)
	}
	return nil, totalPrice, nil
}

func addCartItem(ctx context.Context, in *pb.AddToCartRequest) error {
	_, err := cartRepository.CreateCart(&entities.CartEntity{UserId: uint(in.UserId), ProductId: uint(in.ProductId), Quantity: in.Quantity, Currency: in.Currency})
	if err != nil {
		return status.Error(codes.Aborted, constants.CartNotCreated)
	}
	return nil
}

func updateItem(ctx context.Context, in *pb.UpdateCartItemRequest) error {
	cart, err := cartRepository.GetCart(&entities.CartEntity{UserId: uint(in.UserId), ProductId: uint(in.ProductId)})
	if err != nil {
		return status.Error(codes.NotFound, constants.CartNotFound)
	}
	if in.Quantity != cart.Quantity {
		cart.Quantity = *&in.Quantity
	}

	_, err = cartRepository.UpdateCart(cart)
	if err != nil {
		return status.Error(codes.Aborted, constants.CartNotUpdated)
	}

	return nil
}

func removeItem(ctx context.Context, in *pb.RemoveCartItemRequest) error {
	cart, err := cartRepository.GetCart(&entities.CartEntity{UserId: uint(in.UserId), ProductId: uint(in.ProductId)})
	if err != nil {
		return status.Error(codes.NotFound, constants.CartNotFound)
	}

	_, err = cartRepository.DeleteCart(cart)
	if err != nil {
		return status.Error(codes.Aborted, constants.CartNotDeleted)
	}

	return nil
}
