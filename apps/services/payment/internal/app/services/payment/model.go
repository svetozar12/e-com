package payment

import (
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"
	"svetozar12/e-com/v2/apps/services/payment/internal/app/entities"
)

func ConvertToPBPayment(transaction *entities.TransactionEntity, status pb.PaymentStatus) *pb.PaymentResponse {

	return &pb.PaymentResponse{
		Message: status, TransactionId: 1}
}
