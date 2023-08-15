package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                        string `env:"PRODUCT_CATALOG_SERVICE_PORT" envDefault:"9001"`
	POSTGRES_CONNECTION_STRING  string `env:"PRODUCT_CATALOG_SERVICE_POSTGRES_CONNECTION_STRING" envDefault:"postgres://postgres:postgrespw@localhost:5432"`
	FILE_UPLOAD_SERVICE_ADDRESS string `env:"PRODUCT_CATALOG_FILE_UPLOAD_SERVICE_PORT" envDefault:"0.0.0.0:9002"`
	INVENTORY_SERVICE_ADDRESS   string `env:"PRODUCT_CATALOG_INVENTORY_SERVICE_PORT" envDefault:"0.0.0.0:9003"`
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
		Port:                        getEnv("PORT", "9008"),
		POSTGRES_CONNECTION_STRING:  getEnv("POSTGRES_CONNECTION_STRING", "postgres://postgres:postgrespw@localhost:5432"),
		FILE_UPLOAD_SERVICE_ADDRESS: getEnv("PRODUCT_CATALOG_FILE_UPLOAD_SERVICE_ADDRESS", "0.0.0.0:9002"),
		INVENTORY_SERVICE_ADDRESS:   getEnv("PRODUCT_CATALOG_INVENTORY_SERVICE_ADDRESS", "0.0.0.0:9003"),
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
