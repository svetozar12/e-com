package bootstrap

import (
	"svetozar12/e-com/v2/apps/services/aggregator/internal/app/services/gateway"
	"svetozar12/e-com/v2/apps/services/aggregator/internal/pkg/env"
)

func Bootstrap() {
	env.InitConfig()
	gateway.Run()

}
