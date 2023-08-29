package productRepository

import (
	"svetozar12/e-com/v2/apps/services/inventory/internal/app/databases/postgres"
	"svetozar12/e-com/v2/libs/api/entities"
)

func GetProduct(query interface{}, args ...interface{}) (*entities.ProductEntity, error) {
	product := new(entities.ProductEntity)
	err := postgres.DB.Where(query, args).First(product).Error

	return product, err
}

func GetProductList(userIds []string, args ...interface{}) ([]entities.ProductEntity, error) {
	products := []entities.ProductEntity{}
	err := postgres.DB.Where("id in (?)", userIds, args).Find(&products).Error
	return products, err
}

func CreateProduct(product *entities.ProductEntity) (*entities.ProductEntity, error) {
	err := postgres.DB.Create(product).Error
	return product, err
}

func UpdateProduct(product *entities.ProductEntity) (*entities.ProductEntity, error) {
	err := postgres.DB.Save(product).Error
	return product, err
}

func DeleteProduct(product *entities.ProductEntity) (*entities.ProductEntity, error) {
	err := postgres.DB.Delete(&product).Error
	return product, err
}

func HardDeleteProduct(product *entities.ProductEntity) (*entities.ProductEntity, error) {
	err := postgres.DB.Unscoped().Delete(&product).Error
	return product, err
}
