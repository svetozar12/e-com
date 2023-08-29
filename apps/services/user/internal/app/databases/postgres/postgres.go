package postgres

import (
	"svetozar12/e-com/v2/apps/services/user/internal/pkg/env"
	"svetozar12/e-com/v2/libs/api/entities"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitPostgres() {
	var err error
	DB, err = gorm.Open(postgres.Open(env.Envs.POSTGRES_CONNECTION_STRING), &gorm.Config{DisableForeignKeyConstraintWhenMigrating: true})
	if err != nil {
		panic(err)
	}
	DB.AutoMigrate(&entities.UserEntity{})
	println("Connected to postgres!")

}
