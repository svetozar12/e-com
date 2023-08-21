import yaml

OUTPUT_FILE = "./apps/services/aggregator/third_party/swagger.yaml"

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
proto_names = ["product-catalog","user"]

# Merge YAML files
for proto_name in proto_names:
    oapi_path = get_oapi_path(proto_name)
    with open(oapi_path, "r") as file:
        data = yaml.safe_load(file)
        merged_data["paths"].update(data.get("paths", {}))
        merged_data["components"]["schemas"].update(data.get("components", {}).get("schemas", {}))

# Convert merged data to YAML and write to the output file
with open(OUTPUT_FILE, "w") as output_file:
    yaml.dump(merged_data, output_file)

print(f"Merged OpenAPI YAML file saved as {OUTPUT_FILE}")
