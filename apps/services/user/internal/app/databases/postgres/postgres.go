package postgres

import (
	"svetozar12/e-com/v2/apps/services/user/internal/app/entities"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitPostgres() {
	var err error
	DB, err = gorm.Open(postgres.Open("postgres://postgres:postgrespw@localhost:49153"), &gorm.Config{DisableForeignKeyConstraintWhenMigrating: true})
	if err != nil {
		panic(err)
	}
	DB.AutoMigrate(entities.UserEntity{})
	println("Connected to postgress")

}
