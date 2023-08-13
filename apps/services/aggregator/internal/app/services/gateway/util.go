package gateway

import (
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/cart"
	getfile "svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/gateway/customHandlers/getFIle"
	customProductCatalogHandlers "svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/gateway/customHandlers/product-catalog"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/notification"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/order"
	productcatalog "svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/product-catalog"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/review"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/user"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

func initServices(gwmux *runtime.ServeMux) {
	// services
	user.ConnectToUserService(gwmux)
	review.ConnectToReviewService(gwmux)
	productcatalog.ConnectToProductCatalogService(gwmux)
	cart.ConnectToCartService(gwmux)
	order.ConnectToOrderService(gwmux)
	notification.ConnectToNotificationService(gwmux)
	// custom handlers
	customProductCatalogHandlers.InitProductCatalogHandlers(gwmux)
	getfile.InitProductCatalogHandlers(gwmux)
}
