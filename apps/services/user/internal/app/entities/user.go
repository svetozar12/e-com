package entities

type UserEntity struct {
	Model
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
	Fname    string `json:"fname,omitempty"`
	Lname    string `json:"lname,omitempty"`
}
