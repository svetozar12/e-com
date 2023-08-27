package bootstrap

import (
	"log"
	"net"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/app/messageQues"
	fileupload "svetozar12/e-com/v2/apps/services/file-upload/internal/app/services/file-upload"
	"svetozar12/e-com/v2/apps/services/file-upload/internal/pkg/env"

	"google.golang.org/grpc"
)

func Bootstrap() {
	env.InitConfig()
	go messageQues.Boots()
	grpcAddr := ":" + env.Envs.Port
	listener, err := net.Listen("tcp", grpcAddr)
	if err != nil {
		panic(err)
	}
	s := grpc.NewServer()
	fileupload.InitFileUploadService(s)
	println("file-upload service started on port", grpcAddr)
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
