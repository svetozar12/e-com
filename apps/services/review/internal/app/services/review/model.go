package review

import (
	pb "svetozar12/e-com/v2/api/v1/review/dist/proto"
	"svetozar12/e-com/v2/apps/services/review/internal/app/entities"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func ConvertToPBReview(reviewEntity *entities.ReviewEntity) *pb.Review {
	return &pb.Review{
		Rating:    int32(reviewEntity.Rating),
		ReviewId:  int32(reviewEntity.ID),
		ProductId: int32(reviewEntity.ProductId),
		UserId:    int32(reviewEntity.UserId),
		Comment:   reviewEntity.Comment,
		Timestamp: timestamppb.New(reviewEntity.CreatedAt),
	}
}

func ConvertArrayToPBReviews(reviewEntities []entities.ReviewEntity) []*pb.Review {
	var pbReviews []*pb.Review

	for _, reviewEntity := range reviewEntities {
		pbReview := ConvertToPBReview(&reviewEntity)
		pbReviews = append(pbReviews, pbReview)
	}

	return pbReviews
}
