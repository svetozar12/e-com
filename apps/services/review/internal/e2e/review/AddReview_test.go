package review_test

import (
	"context"
	"fmt"
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

func TestAddReview(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.DialContext(ctx, "bufnet", grpc.WithContextDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()
	client := pb.NewReviewServiceClient(conn)
	var review *pb.Review
	productId := 1
	userId := 1
	comment := "dummy comment"
	rating := 2
	t.Run("rpc AddReview(expected behavior)", func(t *testing.T) {
		resp, err := client.AddReview(ctx, &pb.AddReviewRequest{ProductId: int32(productId), UserId: int32(userId), Comment: comment, Rating: int32(rating)})
		if err != nil {
			t.Fatalf("AddReview failed: %v", err)
		}
		review = resp

		if resp.ProductId != int32(productId) {
			t.Fatalf(constants.InvalidFieldValueMessage("ProductId"))
		}
		if resp.UserId != int32(userId) {
			t.Fatalf(constants.InvalidFieldValueMessage("UserId"))
		}
		if resp.Comment != comment {
			t.Fatalf(constants.InvalidFieldValueMessage("comment"))
		}
		if resp.Rating != int32(rating) {
			t.Fatalf(constants.InvalidFieldValueMessage("rating"))
		}
	})

	t.Run("rpc AddReview(already exists)", func(t *testing.T) {
		_, err := client.AddReview(ctx, &pb.AddReviewRequest{ProductId: int32(productId), UserId: int32(userId), Comment: comment, Rating: int32(rating)})
		fmt.Println(err.Error(), "ERROR")
		if err.Error() != status.Error(codes.AlreadyExists, reviewConstants.ReviewAlreadyExists).Error() {
			t.Errorf(err.Error())
		}
	})

	t.Run("rpc AddReview(invalid input)", func(t *testing.T) {
		_, err := client.AddReview(ctx, &pb.AddReviewRequest{ProductId: 0, UserId: 0, Comment: "", Rating: 9})
		fmt.Println(err.Error())
		if !strings.Contains(err.Error(), "ProductId: "+constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("productId"))
		}
		if !strings.Contains(err.Error(), "UserId: "+constants.GTEValueMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("userId"))
		}
		if !strings.Contains(err.Error(), "Comment: "+constants.MinLenMessage("1")) {
			t.Errorf(constants.InvalidFieldMessage("comment"))
		}
		if !strings.Contains(err.Error(), "Rating: "+constants.RangeValueMessage("1", "5")) {
			t.Errorf(constants.InvalidFieldMessage("rating"))
		}
	})

	t.Cleanup(func() {
		reviewrepository.HardDeleteReview(&entities.ReviewEntity{}, "id = ?", review.ReviewId)
	})
}
