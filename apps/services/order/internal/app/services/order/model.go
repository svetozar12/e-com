package order

import (
	pb "svetozar12/e-com/v2/api/v1/order/dist/proto"
	"svetozar12/e-com/v2/apps/services/order/internal/app/entities"
)

func ProtoItemsToEntityItems(protoItems []*pb.Item) []entities.Item {
	var entityItems []entities.Item

	for _, protoItem := range protoItems {
		entityItem := ProtoItemToEntityItem(protoItem)
		if entityItem != nil {
			entityItems = append(entityItems, *entityItem)
		}
	}

	return entityItems
}

func ProtoItemToEntityItem(protoItem *pb.Item) *entities.Item {
	if protoItem == nil {
		return nil
	}

	return &entities.Item{
		ProductID: protoItem.ProductId,
		Quantity:  protoItem.Quantity,
	}
}

// EntityOrderToProtoGetOrderResponse maps an entity Order to a GetOrderResponse protobuf message
func EntityOrderToProtoGetOrderResponse(entityOrder *entities.Order) *pb.GetOrderResponse {
	if entityOrder == nil {
		return nil
	}

	protoItems := make([]*pb.Item, 0)
	for _, item := range entityOrder.Items {
		protoItem := EntityItemToProtoItem(&item)
		protoItems = append(protoItems, protoItem)
	}

	return &pb.GetOrderResponse{
		OrderId:         int32(entityOrder.ID),
		UserId:          entityOrder.UserID,
		Items:           protoItems,
		ShippingAddress: entityOrder.ShippingAddress,
		Status:          pb.OrderStatus(entityOrder.Status), // Assuming Status is an enum in your entity
	}
}

func EntityItemToProtoItem(entityItem *entities.Item) *pb.Item {
	if entityItem == nil {
		return nil
	}

	return &pb.Item{
		ProductId: entityItem.ProductID,
		Quantity:  entityItem.Quantity,
	}
}
