package productCatalogPublishers

import (
	"context"
	"encoding/json"
	"log"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"

	amqp "github.com/rabbitmq/amqp091-go"
)

func UpdateProductInventory(ch *amqp.Channel, inventoryData map[string]any) error {

	data, err := json.Marshal(inventoryData)
	if err != nil {
		log.Fatalf("Failed to marshal json: %v", err)
	}
	err = ch.PublishWithContext(context.Background(),
		"",                                     // Exchange
		constants.CreateInventoryResponseQuery, // Routing key
		false,                                  // Mandatory
		false,                                  // Immediate
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
