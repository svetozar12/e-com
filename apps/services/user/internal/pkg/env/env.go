package env

import (
	"fmt"
	"log"

	"github.com/caarlos0/env"
)

type Config struct {
	Port                       string `env:"PORT" envDefault:"9000"`
	POSTGRES_CONNECTION_STRING string `env:"POSTGRES_CONNECTION_STRING" envDefault:"postgres://postgres:postgrespw@localhost:5432"`
	JWT_SECRET                 string `env:"JWT_SECRET" envDefault:"secret"`
}

var Envs Config

/*
InitConfig initializes the configuration by parsing environment variables and storing them in Config and ServicesConfig structs.
*/
func InitConfig() {
	cfg := Config{}

	if err := env.Parse(&cfg); err != nil {
		log.Fatal(err)
	}
	Envs = cfg
	fmt.Println("Envs were successfully loaded!")
}
