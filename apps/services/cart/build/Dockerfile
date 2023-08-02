FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/cart ./apps/services/cart
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /cart apps/services/cart/main.go

FROM scratch

COPY --from=deps cart .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/cart"]