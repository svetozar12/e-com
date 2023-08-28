package inventoryPublishers

import (
	"context"
	"encoding/json"
	"log"
	inventoryPb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/product-catalog/internal/pkg/constants"

	amqp "github.com/rabbitmq/amqp091-go"
)

func AddInventoryMessage(ch *amqp.Channel, inventoryData *inventoryPb.AddInventoryRequest) error {
	data, err := json.Marshal(inventoryData)
	if err != nil {
		return err
	}
	err = ch.PublishWithContext(context.Background(),
		"",                                    // Exchange
		constants.CreateInventoryRequestQuery, // Routing key
		false,                                 // Mandatory
		false,                                 // Immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        data,
		},
	)
	if err != nil {
		log.Fatalf("Failed to publish a message: %v", err)
	}
	return err
}
