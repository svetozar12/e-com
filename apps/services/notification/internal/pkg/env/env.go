package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port                       string
	POSTGRES_CONNECTION_STRING string
	EMAIL                      string
	PASSWORD                   string
}

var Envs Config

/*
InitConfig initializes the configuration by parsing environment variables and storing them in Config and ServicesConfig structs.
*/
func InitConfig() {
	// Load environment variables from .env file
	err := godotenv.Load("apps/services/notification/.env")
	if err != nil {
		// Handle error if the .env file can't be loaded
		panic(err)
	}

	Envs = Config{
		Port:                       getEnv("NOTIFICATION_SERVICE_PORT", "9008"),
		POSTGRES_CONNECTION_STRING: getEnv("POSTGRES_CONNECTION_STRING", "postgres://postgres:postgrespw@localhost:5432"),
		EMAIL:                      getEnv("NOTIFICATION_SERVICE_EMAIL", "ecom79792@gmail.com"),
		PASSWORD:                   getEnv("NOTIFICATION_SERVICE_PASSWORD", "")}

	fmt.Println("Envs were successfully loaded!")
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
