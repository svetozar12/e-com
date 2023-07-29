package review

import (
	"context"
	pb "svetozar12/e-com/v2/api/v1/review/dist/proto"
	"svetozar12/e-com/v2/apps/services/review/internal/app/entities"
	reviewrepository "svetozar12/e-com/v2/apps/services/review/internal/app/repositories/reviewRepository"
	"svetozar12/e-com/v2/apps/services/review/internal/pkg/constants"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func getReview(ctx context.Context, in *pb.GetReviewRequest) (*pb.Review, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	review, err := reviewrepository.GetReview("id = ?", in.ReviewId)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.ReviewNotFound)
	}
	return ReviewModel(review), nil
}

func getProductReviews(ctx context.Context, in *pb.GetProductReviewsRequest) (*pb.GetProductReviewsResponse, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	review, err := reviewrepository.GetReviewList("product_id = ?", in.ProductId)
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.ReviewNotFound)
	}
	// []*pb.Review.
	// review.()
	return &pb.GetProductReviewsResponse{Review: review}, nil
	// return ReviewModel(review), nil
}

func addReview(ctx context.Context, in *pb.AddReviewRequest) (*pb.Review, error) {
	err := in.ValidateAll()
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, err.Error())
	}
	exists, _ := reviewrepository.ReviewExists(&entities.ReviewEntity{UserId: uint(in.UserId), ProductId: uint(in.UserId)})
	if exists {
		return nil, status.Error(codes.AlreadyExists, constants.ReviewAlreadyExists)
	}
	review, err := reviewrepository.CreateReview(&entities.ReviewEntity{ProductId: uint(in.ProductId), UserId: uint(in.UserId), Comment: in.Comment, Rating: in.Rating})
	if err != nil {
		return nil, status.Error(codes.NotFound, constants.ReviewNotFound)
	}

	return ReviewModel(review), nil
}
