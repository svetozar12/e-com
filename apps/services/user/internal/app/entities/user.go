package entities

type UserEntity struct {
	Model
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}
