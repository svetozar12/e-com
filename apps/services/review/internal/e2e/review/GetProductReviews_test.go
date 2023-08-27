package review_test

import (
	"context"

	"strings"
	"testing"

	pb "svetozar12/e-com/v2/api/v1/review/dist/proto"
	"svetozar12/e-com/v2/apps/services/review/internal/app/entities"
	reviewrepository "svetozar12/e-com/v2/apps/services/review/internal/app/repositories/reviewRepository"

	reviewConstants "svetozar12/e-com/v2/apps/services/review/internal/pkg/constants"
	"svetozar12/e-com/v2/libs/api/constants"

	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func TestGetProductReviews(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewReviewServiceClient(conn)
	review, err := reviewrepository.CreateReview(&entities.ReviewEntity{ProductId: 1, UserId: 1, Comment: "dummy comment", Rating: 2})
	review2, _ := reviewrepository.CreateReview(&entities.ReviewEntity{ProductId: 1, UserId: 1, Comment: "dummy comment2", Rating: 4})
	t.Run("rpc GetProductReviews(expected behavior)", func(t *testing.T) {
		resp, err := client.GetProductReviews(ctx, &pb.GetProductReviewsRequest{ProductId: int32(review.ProductId)})
		if err != nil {
			t.Fatalf("GetReview failed: %v", err)
		}
		if resp.Review[0].ReviewId != int32(review.ID) {
			t.Fatalf(constants.InvalidFieldValueMessage("id"))
		}
		if resp.Review[0].ProductId != int32(review.ProductId) {
			t.Fatalf(constants.InvalidFieldValueMessage("ProductId"))
		}
		if resp.Review[0].UserId != int32(review.UserId) {
			t.Fatalf(constants.InvalidFieldValueMessage("UserId"))
		}
		if resp.Review[0].Comment != review.Comment {
			t.Fatalf(constants.InvalidFieldValueMessage("comment"))
		}
		if resp.Review[0].Rating != review.Rating {
			t.Fatalf(constants.InvalidFieldValueMessage("rating"))
		}
	})

	t.Run("rpc GetProductReviews(invalid input)", func(t *testing.T) {
		_, err := client.GetReview(ctx, &pb.GetReviewRequest{ReviewId: int32(0)})
		if !strings.Contains(err.Error(), constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("id"))
		}
	})

	t.Run("rpc GetProductReviews(not found)", func(t *testing.T) {
		_, err := client.GetReview(ctx, &pb.GetReviewRequest{ReviewId: int32(99999)})

		if err.Error() != status.Error(codes.NotFound, reviewConstants.ReviewNotFound).Error() {
			t.Errorf(err.Error())
		}
	})

	t.Cleanup(func() {
		reviewrepository.HardDeleteReview(&entities.ReviewEntity{}, "id = ?", review.ID)
		reviewrepository.HardDeleteReview(&entities.ReviewEntity{}, "id = ?", review2.ID)
	})
}
