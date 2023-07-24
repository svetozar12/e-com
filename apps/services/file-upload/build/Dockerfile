FROM golang:1.19 as deps

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY ./apps/services/file-upload ./apps/services/file-upload
COPY ./libs ./libs
COPY ./api ./api

RUN CGO_ENABLED=0 GOOS=linux go build -o /file-upload apps/services/file-upload/main.go

FROM scratch

COPY --from=deps file-upload .

EXPOSE 9000

# Command to run when starting the container.
CMD ["/file-upload"]