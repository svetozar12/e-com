package inventoryRepository

import (
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/entities"
)

func GetInventory(query interface{}, args ...interface{}) (*entities.InventoryEntity, error) {
	inventory := new(entities.InventoryEntity)
	err := postgres.DB.Where(query, args).First(inventory).Error

	return inventory, err
}

func GetInventoryList(inventoryIds []string, args ...interface{}) ([]entities.InventoryEntity, error) {
	inventories := []entities.InventoryEntity{}
	err := postgres.DB.Where("id in (?)", inventoryIds, args).Find(&inventories).Error
	return inventories, err
}

func CreateInventory(inventory *entities.InventoryEntity) (*entities.InventoryEntity, error) {
	err := postgres.DB.Create(inventory).Error
	return inventory, err
}

func UpdateInventory(inventory *entities.InventoryEntity) (*entities.InventoryEntity, error) {
	err := postgres.DB.Save(inventory).Error
	return inventory, err
}

func DeleteInventory(inventory *entities.InventoryEntity) (*entities.InventoryEntity, error) {
	err := postgres.DB.Delete(&inventory).Error
	return inventory, err
}

func HardDeleteInventory(inventory *entities.InventoryEntity, query interface{}, args ...interface{}) (*entities.InventoryEntity, error) {
	err := postgres.DB.Unscoped().Where(query, args).Delete(&inventory).Error
	return inventory, err
}
