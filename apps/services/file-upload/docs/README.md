# File upload service

Performs crud operations on file-upload entity and is used for authentication. Currently the file-upload service in responsible for authentication and file-upload operations.

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
ctx := context.Background()
conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
client := pb.NewAuthenticationServiceClient(conn)
fileupload, _ := file-uploadRepository.Createfile-upload(&entities.file-uploadEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword))})

```
