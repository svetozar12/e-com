package order

import (
	"context"
	"fmt"
	"strconv"
	cart_service "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	pbInventory "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"
	pbPayment "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	user_service "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/order/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/order/internal/app/repositories/orderRepository"
	"svetozar12/e-com/v2/apps/services/order/internal/pkg/constants"
	grpcClients "svetozar12/e-com/v2/apps/services/order/internal/pkg/grpc-clients"
	metadataConstants "svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

func getOrderUtil(ctx context.Context, orderId int32) (*entities.Order, error) {
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("Failed to retrieve metadata from context")
	}
	userId, err := strconv.ParseInt(md.Get(metadataConstants.UserIdKey)[0], 10, 64)
	if err != nil {
		return nil, status.Error(codes.Canceled, "Failed to parse: "+metadataConstants.UserIdKey)
	}
	order, err := orderRepository.GetOrder(&entities.Order{UserID: int32(userId), Model: gorm.Model{ID: uint(orderId)}})
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.OrderNotFound)
	}
	return order, nil
}

func createOrderUtil(ctx context.Context, in *pb.CreateOrderRequest) (*entities.Order, error) {
	isAvailable, err := isProductAvailable(ctx, in.Items)
	if err != nil || !isAvailable {
		return nil, err
	}
	resp, err := grpcClients.CartClient.GetShoppingCart(ctx, &cart_service.GetShoppingCartRequest{UserId: in.UserId})
	if err != nil {
		return nil, err
	}

	respUser, err := grpcClients.UserClient.GetUser(ctx, &user_service.GetUserRequest{Id: in.UserId})
	if err != nil {
		return nil, err
	}
	respPayment, err := grpcClients.PaymentClient.ProcessPayment(ctx, &pbPayment.PaymentRequest{
		Amount:       float64(resp.TotalPrice),
		Currency:     pbPayment.Currency_EUR,
		ReceiptEamil: respUser.Email,
		Token:        in.ShippingAddress})
	if respPayment.Message == pbPayment.PaymentStatus_PaymentFailed {
		return nil, status.Error(codes.Aborted, pbPayment.PaymentStatus_PaymentFailed.String())
	}
	order, err := orderRepository.CreateOrder(&entities.Order{UserID: in.UserId, ShippingAddress: in.ShippingAddress, Status: pb.OrderStatus_PENDING, Items: ProtoItemsToEntityItems(in.Items)})
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.OrderNotFound)
	}
	return order, nil
}

func isProductAvailable(ctx context.Context, Items []*pb.Item) (bool, error) {
	for _, item := range Items {
		resp, err := grpcClients.InventoryClient.GetInventory(ctx, &pbInventory.GetInventoryRequest{ProductId: item.ProductId})
		if err != nil {
			return false, err
		}
		if resp.AvailableQuantity > 1 {
			return false, status.Error(codes.NotFound, constants.ProductUnavailable)
		}

	}
	return true, nil
}
