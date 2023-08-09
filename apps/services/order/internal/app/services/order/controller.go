package order

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"
)

type Server struct {
	pb.UnimplementedOrderServiceServer
}

func (s *Server) GetOrder(ctx context.Context, in *pb.GetOrderRequest) (*pb.GetOrderResponse, error) {
	return getOrder(ctx, in)
}

func (s *Server) CreateOrder(ctx context.Context, in *pb.CreateOrderRequest) (*pb.CreateOrderResponse, error) {
	return createOrder(ctx, in)
}

func (s *Server) UpdateOrder(ctx context.Context, in *pb.UpdateOrderStatusRequest) (*pb.UpdateOrderStatusResponse, error) {
	return updateOrderStatus(ctx, in)
}
