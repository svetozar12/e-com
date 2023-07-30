package entities

type ReviewEntity struct {
	Model
	ProductId int32
	UserId    int32
	Comment   string `json:"comment,omitempty"`
	Rating    int32  `json:"rating,omitempty"`
}
