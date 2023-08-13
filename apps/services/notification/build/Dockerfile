FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/notification ./apps/services/notification
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /notification apps/services/notification/main.go

FROM scratch

COPY --from=deps notification .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/notification"]