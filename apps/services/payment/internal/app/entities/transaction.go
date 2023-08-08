package entities

type TransactionEntity struct {
	Model
	UserId   uint
	Amount   int32  `json:"amount,omitempty"`
	Currency string `json:"currency,omitempty"`
	Status   string `json:"status,omitempty"`
}
