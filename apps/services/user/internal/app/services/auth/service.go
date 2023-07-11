package auth

import (
	"context"
	pb "svetozar12/e-com/v2/libs/api/v1/user/dist/proto"
)

func sayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	return &pb.HelloReply{Message: "Hello, " + in.GetName()}, nil
}
