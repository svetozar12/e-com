package reviewrepository

import (
	"svetozar12/e-com/v2/apps/services/review/internal/app/databases/postgres"
	"svetozar12/e-com/v2/apps/services/review/internal/app/entities"
)

func GetReview(query interface{}, args ...interface{}) (*entities.ReviewEntity, error) {
	review := new(entities.ReviewEntity)
	err := postgres.DB.Where(query, args).First(review).Error

	return review, err
}

func GetReviewList(args ...interface{}) ([]entities.ReviewEntity, error) {
	reviews := []entities.ReviewEntity{}
	err := postgres.DB.Where(args).Find(&reviews).Error
	return reviews, err
}

func CreateReview(review *entities.ReviewEntity) (*entities.ReviewEntity, error) {
	err := postgres.DB.Create(review).Error
	return review, err
}

func UpdateReview(review *entities.ReviewEntity) (*entities.ReviewEntity, error) {
	err := postgres.DB.Save(review).Error
	return review, err
}

func DeleteReview(review *entities.ReviewEntity) (*entities.ReviewEntity, error) {
	err := postgres.DB.Delete(&review).Error
	return review, err
}

func HardDeleteReview(review *entities.ReviewEntity, query interface{}, args ...interface{}) (*entities.ReviewEntity, error) {
	err := postgres.DB.Unscoped().Where(query, args).Delete(&review).Error
	return review, err
}

func ReviewExists(review *entities.ReviewEntity) (bool, error) {
	var exists bool
	err := postgres.DB.Model(&review).
		Select("count(*) > 0").
		Find(&exists).
		Error
	return exists, err
}
