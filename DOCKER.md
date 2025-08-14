# Docker Setup for Open Lovable

This document provides instructions for running the Open Lovable application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier development)
- `.env.local` file with your API keys

## Environment Setup

1. Copy the `.env.local` file and add your API keys:

```bash
# Required
E2B_API_KEY=your_e2b_api_key  # Get from https://e2b.dev (Sandboxes)
FIRECRAWL_API_KEY=your_firecrawl_api_key  # Get from https://firecrawl.dev (Web scraping)

# Optional (need at least one AI provider)
ANTHROPIC_API_KEY=your_anthropic_api_key  # Get from https://console.anthropic.com
OPENAI_API_KEY=your_openai_api_key  # Get from https://platform.openai.com (GPT-5)
GEMINI_API_KEY=your_gemini_api_key  # Get from https://aistudio.google.com/app/apikey
GROQ_API_KEY=your_groq_api_key  # Get from https://console.groq.com (Fast inference - Kimi K2 recommended)
```

## Production Build

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the production container
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the container
docker-compose down
```

### Option 2: Using Docker directly

```bash
# Build the image
./docker-build.sh
# or manually:
docker build -t open-lovable:latest .

# Run the container
docker run -p 3000:3000 --env-file .env.local open-lovable:latest
```

## Development Setup

For development with hot reload:

```bash
# Run development environment
docker-compose --profile dev up --build

# Or build and run development container directly
docker build -f Dockerfile.dev -t open-lovable:dev .
docker run -p 3000:3000 --env-file .env.local -v "$(pwd):/app" -v /app/node_modules open-lovable:dev
```

## Health Check

The application includes a health check endpoint at `/api/health`. You can verify the container is running properly:

```bash
curl http://localhost:3000/api/health
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, modify the port mapping:
```bash
docker run -p 3001:3000 --env-file .env.local open-lovable:latest
```

### Environment Variables Not Loading
Make sure your `.env.local` file is in the same directory as your `docker-compose.yml` file and contains all required variables.

### Build Issues
If you encounter build issues:
1. Clear Docker cache: `docker system prune -a`
2. Ensure all dependencies are properly installed locally first
3. Check that your Node.js version matches the Dockerfile (Node 18)

## Container Management

```bash
# View running containers
docker ps

# View logs
docker-compose logs
docker logs <container_id>

# Stop and remove containers
docker-compose down

# Remove images
docker rmi open-lovable:latest
```
