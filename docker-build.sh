#!/bin/bash

# Build the production Docker image
echo "Building production Docker image..."
docker build -t open-lovable:latest .

echo "Build complete!"
echo "To run the container: docker run -p 3000:3000 --env-file .env.local open-lovable:latest"
echo "Or use docker-compose: docker-compose up"
