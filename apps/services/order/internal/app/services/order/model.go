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
