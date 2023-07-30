# Aggregator service

Acts as reverse proxy and transforms http to grpc request. This service is responsible for communication to the grpc services from the outside world.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-aggregator
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

To add your grpc service to the aggregator create new folder inside apps/services/aggregator/internal/app/services/{your_service}/{your_service.go}

```go
package your_service

import (
	"context"
	"fmt"
	your_servicePb "svetozar12/e-com/v2/api/v1/your_service-catalog/dist/proto"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/grpc"
)

func ConnectToyour_serviceCatalogService(gwmux *runtime.ServeMux) error {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	fmt.Println("REGISTERING your_service")
	err := your_servicePb.RegisterProducCatalogServiceHandlerFromEndpoint(context.Background(), gwmux, "your_service location(ex: 0.0.0.0:9000)", opts)
	if err != nil {
		return err
	}

	return nil
}

```

and then add it to apps/services/aggregator/internal/app/services/gateway

```go
Run() {
    // services
    // ...Other services
    your_service.ConnectToyour_serviceCatalogService(gwmux)
}
```
