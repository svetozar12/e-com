package entities

import "gorm.io/gorm"

type TransactionEntity struct {
	gorm.Model
	UserId   uint
	Amount   int32  `json:"amount,omitempty"`
	Currency string `json:"currency,omitempty"`
	Status   string `json:"status,omitempty"`
}

// TableName overrides the table name used by User to `profiles`
func (TransactionEntity) TableName() string {
	return "Transaction"
}
