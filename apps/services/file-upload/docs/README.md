# File upload service

Centralized place to handle images.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-file-upload
```

## Folder structure

```
file-upload/
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
import (pb "svetozar12/e-com/v2/api/v1/file-upload/dist/proto")

ctx := context.Background()
conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
client := pb.NewImageUploadServiceClient(conn)
fileupload, _ := file-client.GetImage(&pb.GetImageRequest{Id:"image_id"})

```
