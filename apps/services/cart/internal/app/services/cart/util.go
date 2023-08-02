package cart

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	inventory_service "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	product_catalog_service "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/cart/internal/app/entities"
	cartRepository "svetozar12/e-com/v2/apps/services/cart/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/apps/services/cart/internal/pkg/constants"
	grpcclients "svetozar12/e-com/v2/apps/services/cart/internal/pkg/grpc-clients"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func validateCreateProduct(ctx context.Context, in *pb.AddToCartRequest) error {
	inventory, err := grpcclients.InventoryClient.GetInventory(ctx, &inventory_service.GetInventoryRequest{ProductId: in.ProductId})
	if err != nil {
		return err
	}
	if inventory.AvailableQuantity < in.Quantity {
		return status.Error(codes.InvalidArgument, constants.ProductQuantityNotAvailable)
	}
	exists, _ := cartRepository.GetCart(&entities.CartEntity{ProductId: uint(in.ProductId), UserId: uint(in.UserId)})
	if exists.ID != 0 {
		return status.Error(codes.AlreadyExists, constants.CartAlreadyExits)
	}
	return nil
}

func validateUpdateProduct(ctx context.Context, in *pb.UpdateCartItemRequest) error {
	inventory, err := grpcclients.InventoryClient.GetInventory(ctx, &inventory_service.GetInventoryRequest{ProductId: in.ProductId})
	if err != nil {
		return err
	}
	if inventory.AvailableQuantity < in.Quantity {
		return status.Error(codes.InvalidArgument, constants.ProductQuantityNotAvailable)
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
