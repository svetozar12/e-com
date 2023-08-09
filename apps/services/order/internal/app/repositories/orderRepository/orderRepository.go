package orderRepository

import (
	"svetozar12/e-com/v2/apps/services/order/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/order/internal/app/entities"
)

func GetOrder(order *entities.Order) (*entities.Order, error) {
	err := postgres.DB.First(order).Error
	return order, err
}

func GetOrderList(orderIds []string, args ...interface{}) ([]entities.Order, error) {
	inventories := []entities.Order{}
	err := postgres.DB.Where("id in (?)", orderIds, args).Find(&inventories).Error
	return inventories, err
}

func CreateOrder(order *entities.Order) (*entities.Order, error) {
	err := postgres.DB.Create(order).Error
	return order, err
}

func UpdateOrder(order *entities.Order) (*entities.Order, error) {
	err := postgres.DB.Save(order).Error
	return order, err
}

func DeleteOrder(order *entities.Order) (*entities.Order, error) {
	err := postgres.DB.Delete(&order).Error
	return order, err
}

func HardDeleteOrder(order *entities.Order, query interface{}, args ...interface{}) (*entities.Order, error) {
	err := postgres.DB.Unscoped().Where(query, args).Delete(&order).Error
	return order, err
}
