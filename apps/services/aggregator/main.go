package main

import (
	"log"
	"net/http"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/bootstrap"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"
)

func main() {
	bootstrap.Bootstrap()
	fs := http.FileServer(http.Dir("../../../swagger.html"))
	http.Handle("/swagger", fs)
	port := ":" + env.Envs.Port
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
