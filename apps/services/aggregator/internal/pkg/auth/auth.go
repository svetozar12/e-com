package auth

import (
	"context"
	"net/http"
	"strings"
	userPb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func authenticate(w http.ResponseWriter, r *http.Request) bool {
	reqToken := r.Header.Get("Authorization")
	if reqToken == "" {
		return false
	}

	ctx := context.Background()
	conn, err := grpc.Dial(env.Envs.USER_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		return false
	}
	client := userPb.NewAuthenticationServiceClient(conn)

	res, err := client.VerifyToken(ctx, &userPb.VerifyTokenRequest{Token: reqToken})

	if !res.IsValid || err != nil {
		return false
	}

	return true
}

func authenticationMiddleware(w http.ResponseWriter, r *http.Request) bool {
	isValid := authenticate(w, r)

	if !isValid {
		http.Error(w, "401 Unauthorized", 401)
	}
	return isValid
}

func MapProtectedEndpoints(w http.ResponseWriter, r *http.Request) bool {
	authEndpoints := [...]string{"/v1/user", "/v1/product-catalog", "/v1/reviews", "/v1/cart"}
	for _, endpoint := range authEndpoints {
		if strings.HasPrefix(r.URL.Path, endpoint) {
			return authenticationMiddleware(w, r)
		}
	}
	return true
}
