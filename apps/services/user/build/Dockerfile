FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/user ./apps/services/user
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /user apps/services/user/main.go

FROM scratch

COPY --from=deps user .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/user"]