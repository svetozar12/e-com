#!/bin/bash
REPO_URL="https://github.com/swagger-api/swagger-ui.git"
CACHE_DIR="$HOME/.cached_repos/swagger-ui"

rm -r apps/services/aggregator/third_party/swagger-build
mkdir -p apps/services/aggregator/third_party/swagger-build

python3 tools/scripts/mergeSwagger.py
cd apps/services/aggregator/third_party/swagger-build
if [ ! -d "$CACHE_DIR" ]; then
    echo "Cloning repository for the first time..."
    git clone "$REPO_URL" "$CACHE_DIR"
else
    echo "Repository already cached."
fi

cp -r $CACHE_DIR .