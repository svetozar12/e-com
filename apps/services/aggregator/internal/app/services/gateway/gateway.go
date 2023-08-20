package gateway

import (
	"fmt"
	"net/http"
	"os"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/auth"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

func Run() error {
	gwmux := runtime.NewServeMux()
	// services
	initServices(gwmux)
	// oa := getOpenAPIHandler()
	port := env.Envs.Port
	gatewayAddr := ":" + port

	http.Handle("/swagger/", http.StripPrefix("/swagger/", http.FileServer(http.Dir("./apps/services/aggregator/third_party"))))
	http.Handle("/", AuthMiddleware(gwmux))
	mydir, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(mydir)
	// Empty parameters mean use the TLS Config specified with the server.
	if env.Envs.ServeHttp == "true" {
		fmt.Println("Serving gRPC-Gateway and OpenAPI Documentation on port(http)", gatewayAddr)
		err := http.ListenAndServe(gatewayAddr, nil)
		fmt.Println(err)
		return err
	}
	// http.TLSConfig = &tls.Config{
	// 	Certificates: []tls.Certificate{insecure.Cert},
	// }
	fmt.Println("Serving gRPC-Gateway and OpenAPI Documentation on port(https)", gatewayAddr)
	return fmt.Errorf("serving gRPC-Gateway server: %w", http.ListenAndServeTLS(gatewayAddr, "", "", nil))
}

// Middleware function for authentication
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		isAuth := auth.MapProtectedEndpoints(w, r)
		fmt.Println(isAuth, "NE VE")
		if !isAuth {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
