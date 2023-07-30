# File upload service

The File Upload Service is a microservice that facilitates file uploading and management in a distributed system. It offers APIs for users to upload, retrieve, and delete files securely. This service plays a vital role in handling file storage and retrieval, enabling seamless sharing and access to uploaded content across the application.

## Setup

```shell
# should be ran in the root
yarn
yarn nx build services-file-upload
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
client := pb.NewFileUploadServiceClient(conn)
fileupload, _ := client.UploadFile(&entities.file-uploadEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword))})

```
