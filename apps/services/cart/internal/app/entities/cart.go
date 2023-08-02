package entities

type CartEntity struct {
	Model
	ProductId uint
	UserId    uint
	Quantity  int32  `json:"quantity,omitempty"`
	Currency  string `json:"currency,omitempty"`
}
