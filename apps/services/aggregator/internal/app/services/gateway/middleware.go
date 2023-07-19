package gateway

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	userPb "svetozar12/e-com/v2/api/v1/user/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func authenticate(w http.ResponseWriter, r *http.Request) bool {
	reqToken := r.Header.Get("Authorization")
	splitToken := strings.Split(reqToken, "Bearer ")
	if len(splitToken) == 1 {
		return false
	}
	fmt.Println(splitToken, len(splitToken), "greg")
	reqToken = splitToken[1]
	ctx := context.Background()
	conn, err := grpc.Dial(env.Envs.UserServiceAdress, grpc.WithTransportCredentials(insecure.NewCredentials()))
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
