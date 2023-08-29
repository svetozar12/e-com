package inventoryConsumers

import (
	"encoding/json"
	"log"
	inventoryPb "svetozar12/e-com/v2/api/v1/inventory/dist/proto"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/inventoryRepository"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/repositories/productRepository"
	"svetozar12/e-com/v2/apps/services/inventory/internal/pkg/constants"
	"svetozar12/e-com/v2/libs/api/entities"

	amqp "github.com/rabbitmq/amqp091-go"
	"gorm.io/gorm"
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

	inventory, _ := inventoryRepository.CreateInventory(&entities.InventoryEntity{ProductId: uint(data.ProductId), AvailableQuantity: data.InitialQuantity})

	productRepository.UpdateProduct(&entities.ProductEntity{Model: gorm.Model{ID: uint(data.ProductId)}, Inventory: *inventory})
}
