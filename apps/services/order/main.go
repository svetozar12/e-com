package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
)

func main() {
	listener, err := net.Listen("tcp", ":8999")
	if err != nil {
		panic(err)
	}
	s := grpc.NewServer()
	println("Order service started on port 8999")
	if err := s.Serve(listener); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
