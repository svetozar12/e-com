package main_test

import (
	"svetozar12/e-com/v2/apps/services/payment/internal/e2e/payment"
	"testing"
)

func TestMain(t *testing.T) {
	payment.TestProcessPayment(t)
}
