#!/bin/bash

OUTPUT_FILE="merged-swagger.json"

# Function that echoes a message
getOAPIPath() {
    local protoName="$1"
    local message="api/v1/$protoName/dist/openapi/$protoName.swagger.json"
    echo "$message"
}

# Start with an empty JSON object
echo "{" > "$OUTPUT_FILE"
echo '  "swagger": "2.0",' >> "$OUTPUT_FILE"
echo '  "info": {' >> "$OUTPUT_FILE"
echo '    "title": "Merged API Documentation",' >> "$OUTPUT_FILE"
echo '    "version": "1.0"' >> "$OUTPUT_FILE"
echo '  },' >> "$OUTPUT_FILE"
echo '  "paths": {}, "definitions": {}' >> "$OUTPUT_FILE"
echo "}" >> "$OUTPUT_FILE"

# Merge JSON files
CART_PATH=$(getOAPIPath "cart")
INVENTORY_PATH=$(getOAPIPath "inventory")

for FILE in "$CART_PATH" "$INVENTORY_PATH"; do
    # Remove the first two lines of the input JSON file
    sed '1,2d' "$FILE" >> "$OUTPUT_FILE"
done

# Close the merged JSON
echo "}" >> "$OUTPUT_FILE"
echo "Merged Swagger JSON file saved as $OUTPUT_FILE"
