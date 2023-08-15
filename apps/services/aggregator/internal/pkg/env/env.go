package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                            string
	ServeHttp                       string
	USER_SERVICE_ADDRESS            string
	PRODUCT_CATALOG_SERVICE_ADDRESS string `env:"PRODUCT_CATALOG_SERVICE_ADDRESS" envDefault:"0.0.0.0:9001"`
	FILE_UPLOAD_SERVICE_ADDRESS     string `env:"FILE_UPLOAD_SERVICE_ADDRESS" envDefault:"0.0.0.0:9002"`
	REVIEW_SERVICE_ADDRESS          string `env:"REVIEW_SERVICE_ADDRESS" envDefault:"0.0.0.0:9004"`
	CART_SERVICE_ADDRESS            string `env:"CART_SERVICE_ADDRESS" envDefault:"0.0.0.0:9005"`
	ORDER_SERVICE_ADDRESS           string `env:"ORDER_SERVICE_ADDRESS" envDefault:"0.0.0.0:9007"`
	NOTIFICATION_SERVICE_ADDRESS    string `env:"NOTIFICATION_SERVICE_ADDRESS" envDefault:"0.0.0.0:9008"`
}

var Envs Config

/*
InitConfig initializes the configuration by parsing environment variables and storing them in Config and ServicesConfig structs.
*/
func InitConfig() {
	// Load environment variables from .env file
	err := godotenv.Load("apps/services/aggregator/.env")
	if err != nil {
		// Handle error if the .env file can't be loaded
		panic(err)
	}

	Envs = Config{
		Port:                            getEnv("NOTIFICATION_SERVICE_PORT", "9008"),
		ServeHttp:                       getEnv("SERVE_HTTP", "true"),
		USER_SERVICE_ADDRESS:            getEnv("USER_SERVICE_ADDRESS", "0.0.0.0:9000"),
		PRODUCT_CATALOG_SERVICE_ADDRESS: getEnv("PRODUCT_CATALOG_SERVICE_ADDRESS", "0.0.0.0:9001"),
		FILE_UPLOAD_SERVICE_ADDRESS:     getEnv("FILE_UPLOAD_SERVICE_ADDRESS", "0.0.0.0:9002"),
		REVIEW_SERVICE_ADDRESS:          getEnv("REVIEW_SERVICE_ADDRESS", "0.0.0.0:9004"),
		ORDER_SERVICE_ADDRESS:           getEnv("ORDER_SERVICE_ADDRESS", "0.0.0.0:9007"),
		NOTIFICATION_SERVICE_ADDRESS:    getEnv("NOTIFICATION_SERVICE_ADDRESS", "0.0.0.0:9008"),
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
