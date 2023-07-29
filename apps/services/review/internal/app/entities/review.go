package entities

type ReviewEntity struct {
	Model
	ProductId uint
	UserId    uint
	Comment   string `json:"comment,omitempty"`
	Rating    int32  `json:"rating,omitempty"`
}
