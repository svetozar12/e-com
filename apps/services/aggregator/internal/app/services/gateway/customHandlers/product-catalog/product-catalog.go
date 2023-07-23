package productcatalog

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	productPb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var productCatalogClient productPb.ProducCatalogServiceClient

func initProductCatalogClients() {
	conn, err := grpc.Dial(env.Envs.ProductCatalogServiceAdress, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	productCatalogClient = productPb.NewProducCatalogServiceClient(conn)
}

func parseFormData(w http.ResponseWriter, r *http.Request) (err error) {
	errForm := r.ParseForm()
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to parse form: %s", err.Error()), http.StatusBadRequest)
		return errForm
	}

	errMPart := r.ParseMultipartForm(32 << 20)
	if errMPart != nil {
		http.Error(w, fmt.Sprintf("failed to parse multipart form: %s", err.Error()), http.StatusBadRequest)
		return err
	}
	return
}

func handleBinaryFileUpload(w http.ResponseWriter, r *http.Request, params map[string]string) {
	parseFormData(w, r)
	file, _, err := r.FormFile("file")
	if err != nil {
		return
	}

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
		http.Error(w, fmt.Sprintf("failed to copy file: %s", err.Error()), http.StatusInternalServerError)
		return
	}
	idI, err := strconv.ParseInt(params["id"], 1, 64)
	id := int32(idI)
	priceI, err := strconv.ParseInt(r.FormValue("price"), 1, 64)
	price := int32(priceI)
	available, err := strconv.ParseBool(r.FormValue("available"))
	weightI, err := strconv.ParseInt(r.FormValue("weight"), 1, 64)
	weight := int32(weightI)
	data, err := productCatalogClient.CreateProduct(context.Background(), &productPb.CreateProductRequest{Image: buf.Bytes(), Id: id, Name: r.FormValue("name"), Price: price, Description: r.FormValue("description"), Available: available, Weight: weight, Currency: r.FormValue("currency")})

	if err != nil {
		http.Error(w, fmt.Sprintf("failed to upload file: %s", err.Error()), http.StatusInternalServerError)
	}
	b, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Write([]byte(string(b)))
}

func InitProductCatalogHandlers(gwMux *runtime.ServeMux) {
	initProductCatalogClients()
	gwMux.HandlePath("POST", "/v1/product-catalog", handleBinaryFileUpload)
	gwMux.HandlePath("PUT", "/v1/product-catalog/{id}", handleBinaryFileUpload)
}
