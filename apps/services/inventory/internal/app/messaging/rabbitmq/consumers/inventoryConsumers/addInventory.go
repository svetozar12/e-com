package inventoryConsumers

import (
	"encoding/json"
	"log"
	inventoryPb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/entities"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/messaging/rabbitmq"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/messaging/rabbitmq/publishers/productCatalogPublishers"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/inventoryRepository"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"

	amqp "github.com/rabbitmq/amqp091-go"
)

func ConsumeAddInventoryMessage(ch *amqp.Channel) {
	msgs, err := ch.Consume(
		constants.CreateInventoryRequestQuery, // Queue name
		"",                                    // Consumer
		true,                                  // Auto-ack (set to false for manual acknowledgment)
		false,                                 // Exclusive
		false,                                 // No-local
		false,                                 // No-wait
		nil,                                   // Args
	)
	if err != nil {
		log.Fatalf("Failed to start consuming messages: %v", err)
	}
	for msg := range msgs {
		var data *inventoryPb.AddInventoryRequest
		err := json.Unmarshal(msg.Body, &data)
		if err != nil {
			log.Println("Error decoding message:", err)
			continue // Move to the next message
		}
		processAddInventory(data)
	}
}

func processAddInventory(data *inventoryPb.AddInventoryRequest) {
	// Check if data is nil before proceeding
	if data == nil {
		log.Println("Received nil data, skipping update.")
		return
	}

	inventory, err := inventoryRepository.CreateInventory(&entities.InventoryEntity{ProductId: uint(data.ProductId), AvailableQuantity: data.InitialQuantity})
	ch, err := rabbitmq.GetRabbitMQChannel()
	if err != nil {
		panic(err)
	}
	inventoryData := make(map[string]any)
	inventoryData["ProductId"] = data.ProductId
	inventoryData["InventoryId"] = inventory.ID
	productCatalogPublishers.UpdateProductInventory(ch, inventoryData)
}
