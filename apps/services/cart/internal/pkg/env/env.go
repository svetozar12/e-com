package env

import (
	"fmt"
	"log"

	"github.com/caarlos0/env"
)

type Config struct {
	Port                        string `env:"CART_SERVICE_PORT" envDefault:"9005"`
	POSTGRES_CONNECTION_STRING  string `env:"CART_SERVICE_POSTGRES_CONNECTION_STRING" envDefault:"postgres://postgres:postgrespw@localhost:5432"`
	InventoryServiceAdress      string `env:"CART_SERVICE_INVENTORY_SERVICE_ADDRESS" envDefault:"0.0.0.0:9003"`
	ProductCatalogServiceAdress string `env:"CART_SERVICE_PRODUCT_CATALOG_SERVICE_ADDRESS" envDefault:"0.0.0.0:9001"`
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
