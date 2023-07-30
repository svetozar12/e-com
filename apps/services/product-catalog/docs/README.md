# User service

Performs crud operations on product-catalog entity and is used for managing products..

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-product-catalog
```

## Folder structure

```
user/
├─build/    - Packaging and Continuous Integration(dockerfiles etc...).
├─docs/     - Documentation about the service
├─internal/ - Private application and library code.
| ├─app/    - application code
| ├─e2e/    - integration tests
| ├─pkg/    - code that's shared inside the application
├─.env      - Environment variables
```

## Code Examples

To use this service with go

```go
import (pb "svetozar12/e-com/v2/api/v1/product-catalog/dist/proto")

ctx := context.Background()
conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
client := pb.NewProductCatalogServiceClient(conn)
product, _ := client.GetProduct(&pb.GetProductRequest{Id:productId})

```
