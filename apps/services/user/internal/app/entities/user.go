package entities

type UserEntity struct {
	Model
	Email string `json:"email" binding:"required"`
}
