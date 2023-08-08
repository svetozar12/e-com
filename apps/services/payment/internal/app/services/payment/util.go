package payment

import (
	pb "svetozar12/e-com/v2/api/v1/payment/dist/proto"

	"github.com/stripe/stripe-go"
)

func ProtoToStripeCurrency(value pb.Currency) stripe.Currency {
	switch value {
	case pb.Currency_USD:
		return stripe.CurrencyUSD
	case pb.Currency_EUR:
		return stripe.CurrencyEUR
	case pb.Currency_GBP:
		return stripe.CurrencyGBP
	default:
		// Handle any unknown currency values, or return a default value.
		// In this example, we return USD as the default.
		return stripe.CurrencyUSD
	}
}
