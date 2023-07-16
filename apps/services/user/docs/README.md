# User service

Performs crud operations on user entity and is used for authentication. Currently the user service in responsible for authentication and user operations.

## Setup

```shell
# should be ran in the root
yarn
yarn build
yarn nx serve services-user
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
ctx := context.Background()
conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
client := pb.NewAuthenticationServiceClient(conn)
user, _ := userRepository.CreateUser(&entities.UserEntity{Email: testEmail, Password: jwtUtils.HashAndSalt([]byte(testPassword))})

```
