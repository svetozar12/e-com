FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/order ./apps/services/order
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /order apps/services/order/main.go

FROM scratch

COPY --from=deps order .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/order"]