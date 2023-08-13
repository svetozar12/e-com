package entities

import "gorm.io/gorm"

type UserEntity struct {
	gorm.Model
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Fname    string `json:"fname,omitempty"`
	Lname    string `json:"lname,omitempty"`
}

type Tabler interface {
	TableName() string
}

// TableName overrides the table name used by User to `profiles`
func (UserEntity) TableName() string {
	return "User"
}
