package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                       string
	StripeKey                  string
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

	Envs = Config{Port: getEnv("PAYMENT_SERVICE_PORT", "9006"), StripeKey: getEnv("STRIPE_KEY", ""), POSTGRES_CONNECTION_STRING: getEnv("POSTGRES_CONNECTION_STRING", "postgres://postgres:postgrespw@localhost:5432")}
	fmt.Println("Envs were successfully loaded!")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
