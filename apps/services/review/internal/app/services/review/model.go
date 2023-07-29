package review

import (
	pb "svetozar12/e-com/v2/api/v1/review/dist/proto"
	"svetozar12/e-com/v2/apps/services/review/internal/app/entities"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func ReviewModel(review *entities.ReviewEntity) *pb.Review {
	return &pb.Review{ReviewId: int32(review.ID), ProductId: int32(review.ID), UserId: int32(review.UserId), Comment: review.Comment, Rating: review.Rating, Timestamp: timestamppb.New(review.CreatedAt)}
}
