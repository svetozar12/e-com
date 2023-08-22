import yaml
import json

OUTPUT_FILE = "./apps/services/aggregator/third_party/swagger-build/swagger.json"

# Function that generates the OpenAPI YAML file path
def get_oapi_path(proto_name):
    return f"api/v1/{proto_name}/dist/OpenAPI/openapi.yaml"

# Initialize the merged data
merged_data = {
    "openapi": "3.0.0",
    "info": {
        "title": "Merged API Documentation",
        "version": "1.0"
    },
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "apiKey",
                "name": "Authorization",
                "in": "header"
            }
        },
        "schemas": {}
    },
    "security": [
        {
            "bearerAuth": []
        }
    ],
    "paths": {}
}

# List of proto names
proto_names = ["product-catalog","user","review","payment","order","notification","inventory","file-upload","cart"]

# Merge YAML files
for proto_name in proto_names:
    oapi_path = get_oapi_path(proto_name)
    with open(oapi_path, "r") as file:
        data = yaml.safe_load(file)
        merged_data["paths"].update(data.get("paths", {}))
        merged_data["components"]["schemas"].update(data.get("components", {}).get("schemas", {}))

# Convert merged data to JSON and write to the output file
with open(OUTPUT_FILE, "w") as output_file:
    json.dump(merged_data, output_file, indent=4)

print(f"Merged OpenAPI JSON file saved as {OUTPUT_FILE}")
