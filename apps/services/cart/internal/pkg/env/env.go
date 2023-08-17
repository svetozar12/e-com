package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                                         string
	POSTGRES_CONNECTION_STRING                   string
	CART_SERVICE_PRODUCT_CATALOG_SERVICE_ADDRESS string
}

var Envs Config

/*
InitConfig initializes the configuration by parsing environment variables and storing them in Config and ServicesConfig structs.
*/
func InitConfig() {
	// Load environment variables from .env file
	err := godotenv.Load("apps/services/cart/.env")
	if err != nil {
		// Handle error if the .env file can't be loaded
		panic(err)
	}

	Envs = Config{
		Port:                       getEnv("NOTIFICATION_SERVICE_PORT", "9005"),
		POSTGRES_CONNECTION_STRING: getEnv("POSTGRES_CONNECTION_STRING", "postgres://postgres:postgrespw@localhost:5432"),
		CART_SERVICE_PRODUCT_CATALOG_SERVICE_ADDRESS: getEnv("CART_SERVICE_PRODUCT_CATALOG_SERVICE_ADDRESS", "0.0.0.0:9001"),
	}

	fmt.Println("Envs were successfully loaded!")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
