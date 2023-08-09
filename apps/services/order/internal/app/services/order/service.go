package order

import (
	"context"
	"fmt"
	"strconv"
	cart_service "svetozar12/e-com/v2/api/v1/cart/dist/proto"
	pbInventory "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"
	pbPayment "svetozar12/e-com/v2/api/v1/payment/dist/proto"
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

func getOrder(ctx context.Context, in *pb.GetOrderRequest) (*pb.GetOrderResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, fmt.Errorf("Failed to retrieve metadata from context")
	}
	userId, err := strconv.ParseInt(md.Get(metadataConstants.UserIdKey)[0], 10, 64)
	if err != nil {
		return nil, status.Error(codes.Canceled, "Failed to parse: "+metadataConstants.UserIdKey)
	}
	order, err := orderRepository.GetOrder(&entities.Order{UserID: int32(userId), Model: gorm.Model{ID: uint(in.OrderId)}})
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.OrderNotFound)
	}
	return EntityOrderToProtoGetOrderResponse(order), nil
}

func createOrder(ctx context.Context, in *pb.CreateOrderRequest) (*pb.CreateOrderResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	// check if product is available(inventory service)
	for _, item := range in.Items {
		resp, err := grpcClients.InventoryClient.GetInventory(ctx, &pbInventory.GetInventoryRequest{ProductId: item.ProductId})
		if err != nil {
			return nil, err
		}
		if resp.AvailableQuantity > 1 {
			return nil, status.Error(codes.NotFound, constants.ProductUnavailable)
		}

	}
	resp, err := grpcClients.CartClient.GetShoppingCart(ctx, &cart_service.GetShoppingCartRequest{UserId: in.UserId})
	if err != nil {
		return nil, err
	}

	// make payment(payment service)
	// CURRENCY AND RECEIPT EMAIL SHOULD BE TAKEN FROM USER SERVICE
	respPayment, err := grpcClients.PaymentClient.ProcessPayment(ctx, &pbPayment.PaymentRequest{
		Amount:       float64(resp.TotalPrice),
		Currency:     pbPayment.Currency_EUR,
		ReceiptEamil: "temp@abv.bg",
		Token:        in.ShippingAddress})
	if respPayment.Message == pbPayment.PaymentStatus_PaymentFailed {
		return nil, status.Error(codes.Aborted, pbPayment.PaymentStatus_PaymentFailed.String())
	}
	order, err := orderRepository.CreateOrder(&entities.Order{UserID: in.UserId, ShippingAddress: in.ShippingAddress, Status: pb.OrderStatus_PENDING, Items: ProtoItemsToEntityItems(in.Items)})
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.OrderNotFound)
	}
	return &pb.CreateOrderResponse{OrderId: int32(order.ID), Message: "Order created"}, err
}
