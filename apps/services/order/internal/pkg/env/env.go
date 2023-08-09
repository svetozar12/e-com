package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                       string
	INVENTORY_SERVICE_ADDRESS  string
	CART_SERVICE_ADDRESS       string
	PAYMENT_SERVICE_ADDRESS    string
	USER_SERVICE_ADDRESS       string
	POSTGRES_CONNECTION_STRING string
}

var Envs Config

/*
InitConfig initializes the configuration by parsing environment variables and storing them in Config and ServicesConfig structs.
*/
func InitConfig() {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		// Handle error if the .env file can't be loaded
		panic("Error loading .env file")
	}

	Envs = Config{
		Port:                       getEnv("ORDER_SERVICE_PORT", "9007"),
		CART_SERVICE_ADDRESS:       getEnv("CART_SERVICE_INVENTORY_SERVICE_ADDRESS", "0.0.0.0:9005"),
		INVENTORY_SERVICE_ADDRESS:  getEnv("ORDER_SERVICE_INVENTORY_SERVICE_ADDRESS", "0.0.0.0:9003"),
		PAYMENT_SERVICE_ADDRESS:    getEnv("ORDER_SERVICE_PAYMENT_SERVICE_ADDRESS", "0.0.0.0:9006"),
		USER_SERVICE_ADDRESS:       getEnv("ORDER_SERVICE_USER_SERVICE_ADDRESS", "0.0.0.0:9000"),
		POSTGRES_CONNECTION_STRING: getEnv("POSTGRES_CONNECTION_STRING", "postgres://postgres:postgrespw@localhost:5432")}
	fmt.Println("Envs were successfully loaded!")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
