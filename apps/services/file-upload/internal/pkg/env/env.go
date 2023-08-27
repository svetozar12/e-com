package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                        string `env:"FILE_UPLOAD_PORT" envDefault:"9002"`
	RABBIT_MQ_CONNECTION_STRING string
}

var Envs Config

/*
InitConfig initializes the configuration by parsing environment variables and storing them in Config and ServicesConfig structs.
*/
func InitConfig() {
	// Load environment variables from .env file
	err := godotenv.Load("apps/services/file-upload/.env")
	if err != nil {
		// Handle error if the .env file can't be loaded
		panic(err)
	}

	Envs = Config{
		Port:                        getEnv("FILE_UPLOAD_PORT", "9002"),
		RABBIT_MQ_CONNECTION_STRING: getEnv("FILE_UPLOAD_RABBIT_MQ_CONNECTION_STRING", "amqp://guest:guest@localhost:5672/"),
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
