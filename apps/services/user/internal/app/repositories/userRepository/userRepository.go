package userRepository

import (
	"svetozar12/e-com/v2/apps/services/user/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"
)

func GetUser(query interface{}, args ...interface{}) (*entities.UserEntity, error) {
	user := new(entities.UserEntity)
	err := postgres.DB.Where(query, args).First(user).Error

	return user, err
}

func getUserList(userIds []string, args ...interface{}) ([]entities.UserEntity, error) {
	users := []entities.UserEntity{}
	err := postgres.DB.Where("id in (?)", userIds, args).Find(&users).Error
	return users, err
}

func CreateUser(user *entities.UserEntity) (*entities.UserEntity, error) {
	err := postgres.DB.Create(user).Error
	return user, err
}

func UpdateUser(userId uint, user *entities.UserEntity) (*entities.UserEntity, error) {
	err := postgres.DB.Save(user).Error
	return user, err
}

func DeleteUser(user *entities.UserEntity) (*entities.UserEntity, error) {
	err := postgres.DB.Delete(&user).Error
	return user, err
}
