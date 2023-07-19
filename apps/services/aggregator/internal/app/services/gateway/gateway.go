package gateway

import (
	"crypto/tls"
	"fmt"
	"net/http"
	"strings"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/user"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/cors"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/insecure"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

func Run() error {
	gwmux := runtime.NewServeMux()

	user.ConnectToUserService(gwmux)
	// oa := getOpenAPIHandler()
	port := env.Envs.Port
	gatewayAddr := ":" + port
	gwServer := &http.Server{
		Addr: gatewayAddr,
		Handler: http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			cors.EnableCors(w)
			isValid := authenticate(w, r)
			if !isValid {
				http.Error(w, "401 Unauthorized", 401)
				return
			}
			if strings.HasPrefix(r.URL.Path, "/v1") {
				gwmux.ServeHTTP(w, r)
				return
			}
			// oa.ServeHTTP(w, r)
		}),
	}
	// Empty parameters mean use the TLS Config specified with the server.
	if env.Envs.ServeHttp == true {
		fmt.Println("Serving gRPC-Gateway and OpenAPI Documentation on port(http)", gatewayAddr)
		err := gwServer.ListenAndServe()
		fmt.Println(err)
		return err
	}
	gwServer.TLSConfig = &tls.Config{
		Certificates: []tls.Certificate{insecure.Cert},
	}
	fmt.Println("Serving gRPC-Gateway and OpenAPI Documentation on port(https)", gatewayAddr)
	return fmt.Errorf("serving gRPC-Gateway server: %w", gwServer.ListenAndServeTLS("", ""))
}
