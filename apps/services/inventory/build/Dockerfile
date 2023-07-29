FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/inventory ./apps/services/inventory
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /inventory apps/services/inventory/main.go

FROM scratch

COPY --from=deps inventory .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/inventory"]