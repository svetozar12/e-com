package env

import (
	"fmt"
	"log"

	"github.com/caarlos0/env"
)

type Config struct {
	Port                        string `env:"PORT" envDefault:"3000"`
	ServeHttp                   bool   `env:"SERVE_HTTP" envDefault:"true"`
	UserServiceAdress           string `env:"USER_SERVICE_ADDRESS" envDefault:"0.0.0.0:9000"`
	ProductCatalogServiceAdress string `env:"PRODUCT_CATALOG_SERVICE_ADDRESS" envDefault:"0.0.0.0:9001"`
	FileUploadServiceAdress     string `env:"USER_SERVICE_PORT" envDefault:"0.0.0.0:9002"`
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
