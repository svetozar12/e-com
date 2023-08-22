#!/bin/bash
rm -r apps/services/aggregator/third_party/swagger-build
mkdir -p apps/services/aggregator/third_party/swagger-build

python3 tools/scripts/mergeSwagger.py
cd apps/services/aggregator/third_party/swagger-build
git clone https://github.com/swagger-api/swagger-ui.git