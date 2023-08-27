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
	formdata "svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/formData"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

var productCatalogClient productPb.ProducCatalogServiceClient

func initProductCatalogClients() {
	conn, err := grpc.Dial(env.Envs.PRODUCT_CATALOG_SERVICE_ADDRESS, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	productCatalogClient = productPb.NewProducCatalogServiceClient(conn)
}

func handleBinaryFileUpload(w http.ResponseWriter, r *http.Request, params map[string]string) {
	formdata.ParseFormData(w, r)
	file, _, err := r.FormFile("image")
	if err != nil {
		return
	}

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
		http.Error(w, fmt.Sprintf("failed to copy file: %s", err.Error()), http.StatusInternalServerError)
		return
	}

	priceI, err := strconv.ParseInt(r.FormValue("price"), 1, 32)
	price := int32(priceI)
	available, err := strconv.ParseBool(r.FormValue("available"))
	weightI, err := strconv.ParseInt(r.FormValue("weight"), 1, 32)
	weight := int32(weightI)
	var inventory *productPb.InventoryAvaliability
	inventoryJson := r.FormValue("inventory")
	err = json.Unmarshal([]byte(inventoryJson), &inventory)
	if err != nil {
		http.Error(w, fmt.Sprintf("error while unmarshling"), http.StatusInternalServerError)
	}
	fmt.Println(price, weight)
	data, err := productCatalogClient.CreateProduct(context.Background(), &productPb.CreateProductRequest{Image: buf.Bytes(), Inventory: inventory, Name: r.FormValue("name"), Price: price, Description: r.FormValue("description"), Available: available, Weight: weight, Currency: r.FormValue("currency")})
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to upload file: %s", err.Error()), http.StatusInternalServerError)
	}
	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Write([]byte(string(jsonData)))
}

func InitProductCatalogHandlers(gwMux *runtime.ServeMux) {
	initProductCatalogClients()
	gwMux.HandlePath("POST", "/v1/product-catalog", handleBinaryFileUpload)
	gwMux.HandlePath("PUT", "/v1/product-catalog/{id}", handleBinaryFileUpload)
}
