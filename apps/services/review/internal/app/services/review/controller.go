package review

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/review/dist/proto"
)

type Server struct {
	pb.UnimplementedReviewServiceServer
}

func (s *Server) GetReview(ctx context.Context, in *pb.GetReviewRequest) (*pb.Review, error) {
	return getReview(ctx, in)
}

func (s *Server) GetProductReviews(ctx context.Context, in *pb.GetProductReviewsRequest) (*pb.Review, error) {
	return getProductReviews(ctx, in)
}

func (s *Server) AddReview(ctx context.Context, in *pb.AddReviewRequest) (*pb.Review, error) {
	return addReview(ctx, in)
}
