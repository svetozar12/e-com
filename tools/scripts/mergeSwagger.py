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
    "paths": {},
    "definitions": {}
}

# List of proto names
proto_names = ["cart", "inventory"]

# Merge JSON files
for proto_name in proto_names:
    oapi_path = get_oapi_path(proto_name)
    with open(oapi_path, "r") as file:
        data = json.load(file)
        merged_data["paths"].update(data.get("paths", {}))
        merged_data["definitions"].update(data.get("definitions", {}))

# Write merged data to output file
with open(OUTPUT_FILE, "w") as output_file:
    json.dump(merged_data, output_file, indent=2)

print(f"Merged Swagger JSON file saved as {OUTPUT_FILE}")
