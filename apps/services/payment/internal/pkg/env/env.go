package env

import (
	"fmt"
	"log"

	"github.com/caarlos0/env"
)

type Config struct {
	Port      string `env:"PAYMENT_SERVICE_PORT" envDefault:"9006"`
	StripeKey string `env:"STRIPE_KEY"`
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
