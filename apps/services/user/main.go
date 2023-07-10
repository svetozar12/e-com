package main

import (
	"context"
	"log"
	"net"
	pb "svetozar12/e-com/v2/libs/api/v1/user/dist/proto"

	"google.golang.org/grpc"
)

type Server struct {
	pb.UnimplementedTutorialServer
}

// We implement the SayHello method of the server interface. 🥳🥳🥳
func (s *Server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{Message: "Hello, " + in.GetName()}, nil
}

func main() {
	println("gRPC server tutorial in Go")

	listener, err := net.Listen("tcp", ":9000")
	if err != nil {
		panic(err)
	}

	s := grpc.NewServer()
	pb.RegisterTutorialServer(s, &Server{})
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
