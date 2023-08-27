package gateway

import (
	"fmt"
	"net/http"
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

	http.Handle("/v1/swagger/", http.StripPrefix("/v1/swagger/", http.FileServer(http.Dir("./apps/services/aggregator/third_party"))))
	http.Handle("/", RedirectToDocsMiddleware(AuthMiddleware(gwmux)))
	// Empty parameters mean use the TLS Config specified with the server.
	if env.Envs.ServeHttp == "true" {
		fmt.Println("Aggregator service is running on http://localhost" + gatewayAddr)
		err := http.ListenAndServe(gatewayAddr, nil)
		fmt.Println(err)
		return err
	}

	fmt.Println("Aggregator service is running on https://" + gatewayAddr)
	return fmt.Errorf("serving gRPC-Gateway server: %w", http.ListenAndServeTLS(gatewayAddr, "", "", nil))
}

// Middleware function for authentication
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		isAuth := auth.MapProtectedEndpoints(w, r)
		if !isAuth {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Middleware function for authentication
func RedirectToDocsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			// Perform redirection to a new URL
			http.Redirect(w, r, "/v1/swagger", http.StatusFound) // Use the appropriate redirection status code
		}
		next.ServeHTTP(w, r)
	})
}
