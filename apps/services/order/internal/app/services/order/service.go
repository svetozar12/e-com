package order

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"
	"svetozar12/e-com/v2/apps/services/order/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/order/internal/app/repositories/orderRepository"
	"svetozar12/e-com/v2/apps/services/order/internal/pkg/constants"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/gorm"
)

func getOrder(ctx context.Context, in *pb.GetOrderRequest) (*pb.GetOrderResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	order, err := getOrderUtil(ctx, in.OrderId)
	if err != nil {
		return nil, err
	}
	return EntityOrderToProtoGetOrderResponse(order), nil
}

func createOrder(ctx context.Context, in *pb.CreateOrderRequest) (*pb.CreateOrderResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	order, err := createOrderUtil(ctx, in)
	if err != nil {
		return nil, err
	}

	return &pb.CreateOrderResponse{OrderId: int32(order.ID), Message: constants.OrderCreated}, err
}

func updateOrderStatus(ctx context.Context, in *pb.UpdateOrderStatusRequest) (*pb.UpdateOrderStatusResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	order, err := getOrderUtil(ctx, in.OrderID)
	if err != nil {
		return nil, err
	}
	updatedOrder, err := orderRepository.UpdateOrder(&entities.Order{UserID: int32(order.UserID), Model: gorm.Model{ID: order.ID}, Status: in.NewStatus})
	return &pb.UpdateOrderStatusResponse{OrderId: int32(updatedOrder.ID), Message: constants.OrderStatusUpdated}, nil
}
