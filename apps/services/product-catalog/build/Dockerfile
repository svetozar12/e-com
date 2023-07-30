FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/product-catalog ./apps/services/product-catalog
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /product-catalog apps/services/product-catalog/main.go

FROM scratch

COPY --from=deps product-catalog .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/product-catalog"]