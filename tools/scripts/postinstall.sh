go mod download \
  && go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28 \
  && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2 \
  && go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway@latest \
  && go install github.com/google/gnostic/cmd/protoc-gen-openapi@latest

go install github.com/mitranim/gow@latest