package entities

import "gorm.io/gorm"

type ReviewEntity struct {
	gorm.Model
	ProductId int32
	UserId    int32
	Comment   string `json:"comment,omitempty"`
	Rating    int32  `json:"rating,omitempty"`
}

// TableName overrides the table name used by User to `profiles`
func (ReviewEntity) TableName() string {
	return "Review"
}
