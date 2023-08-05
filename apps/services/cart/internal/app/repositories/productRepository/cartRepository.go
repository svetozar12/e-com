package cartRepository

import (
	"svetozar12/e-com/v2/apps/services/cart/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/cart/internal/app/entities"
)

func GetCart(cart *entities.CartEntity) (*entities.CartEntity, error) {
	err := postgres.DB.Where(cart).First(cart).Error

	return cart, err
}

func GetCartList(cart *entities.CartEntity) ([]entities.CartEntity, error) {
	carts := []entities.CartEntity{}
	err := postgres.DB.Where(cart).Find(&carts).Error
	return carts, err
}

func CreateCart(cart *entities.CartEntity) (*entities.CartEntity, error) {
	err := postgres.DB.Create(cart).Error
	return cart, err
}

func UpdateCart(cart *entities.CartEntity) (*entities.CartEntity, error) {
	err := postgres.DB.Save(cart).Error
	return cart, err
}

func DeleteCart(cart *entities.CartEntity) (*entities.CartEntity, error) {
	err := postgres.DB.Delete(&cart).Error
	return cart, err
}

func HardDeleteCart(cart *entities.CartEntity) (*entities.CartEntity, error) {
	err := postgres.DB.Unscoped().Delete(&cart).Error
	return cart, err
}
