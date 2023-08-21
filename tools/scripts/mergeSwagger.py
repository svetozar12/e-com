import json

OUTPUT_FILE = "./apps/services/aggregator/third_party/swagger.json"

# Function that generates the Swagger JSON file path
def get_oapi_path(proto_name):
    return f"api/v1/{proto_name}/dist/openapi/{proto_name}.swagger.json"

# Initialize the merged data
merged_data = {
    "swagger": "2.0",
    "info": {
        "title": "Merged API Documentation",
        "version": "1.0"
    },
    "securityDefinitions": {
        "bearerAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header",
            "description": "Bearer token authorization"
        }
    },
    "security": [
        {
            "bearerAuth": []
        }
    ],
    "paths": {},
    "definitions": {}
}

# List of proto names
proto_names = ["cart", "file-upload", "inventory", "notification", "order", "payment", "product-catalog", "review", "user"]

# Merge JSON files
for proto_name in proto_names:
    oapi_path = get_oapi_path(proto_name)
    with open(oapi_path, "r") as file:
        data = json.load(file)
        merged_data["paths"].update(data.get("paths", {}))
        merged_data["definitions"].update(data.get("definitions", {}))

# Add example multipart/form-data endpoint
example_form_data_path = "/example/form-data"
merged_data["paths"][example_form_data_path] = {
    "post": {
        "summary": "Example Form Data Endpoint",
        "consumes": ["multipart/form-data"],
        "produces": ["application/json"],
        "parameters": [
            {
                "name": "file",
                "in": "formData",
                "type": "file",
                "required": True
            },
            {
                "name": "additional_field",
                "in": "formData",
                "type": "string"
            }
        ],
        "responses": {
            "200": {
                "description": "Success response"
            }
        }
    }
}

# Write merged data to the output file
with open(OUTPUT_FILE, "w") as output_file:
    json.dump(merged_data, output_file, indent=2)

print(f"Merged Swagger JSON file saved as {OUTPUT_FILE}")
