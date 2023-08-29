package transactionRepository

import (
	"svetozar12/e-com/v2/apps/services/payment/internal/app/databases/postgres"
	"svetozar12/e-com/v2/libs/api/entities"
)

func GetTransaction(transaction *entities.TransactionEntity) (*entities.TransactionEntity, error) {
	err := postgres.DB.First(transaction).Error
	return transaction, err
}

func GetTransactionList(transactionIds []string, args ...interface{}) ([]entities.TransactionEntity, error) {
	inventories := []entities.TransactionEntity{}
	err := postgres.DB.Where("id in (?)", transactionIds, args).Find(&inventories).Error
	return inventories, err
}

func CreateTransaction(transaction *entities.TransactionEntity) (*entities.TransactionEntity, error) {
	err := postgres.DB.Create(transaction).Error
	return transaction, err
}

func UpdateTransaction(transaction *entities.TransactionEntity) (*entities.TransactionEntity, error) {
	err := postgres.DB.Save(transaction).Error
	return transaction, err
}

func DeleteTransaction(transaction *entities.TransactionEntity) (*entities.TransactionEntity, error) {
	err := postgres.DB.Delete(&transaction).Error
	return transaction, err
}

func HardDeleteTransaction(transaction *entities.TransactionEntity) (*entities.TransactionEntity, error) {
	err := postgres.DB.Unscoped().Delete(&transaction).Error
	return transaction, err
}
