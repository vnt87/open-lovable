# GitHub Actions Workflows

## Docker Build and Push

This workflow (`docker-build-push.yml`) automatically builds and pushes Docker images to GitHub Container Registry (GHCR) on every push to the main/master branch.

### Features

- **Multi-platform builds**: Supports both `linux/amd64` and `linux/arm64` architectures
- **Smart tagging**: Creates multiple tags based on branch, PR, commit SHA, and latest
- **Build caching**: Uses GitHub Actions cache to speed up subsequent builds
- **Security**: Uses GitHub's built-in `GITHUB_TOKEN` for authentication

### Image Tags

The workflow creates the following tags:
- `ghcr.io/[owner]/nvai-reimagine:main` - Latest build from main branch
- `ghcr.io/[owner]/nvai-reimagine:latest` - Same as main (only for default branch)
- `ghcr.io/[owner]/nvai-reimagine:main-[sha]` - Specific commit SHA
- `ghcr.io/[owner]/nvai-reimagine:pr-[number]` - Pull request builds

### Usage

After the workflow runs successfully, you can pull and run the image:

```bash
# Pull the latest image
docker pull ghcr.io/[owner]/nvai-reimagine:latest

# Run the container
docker run -p 3000:3000 ghcr.io/[owner]/nvai-reimagine:latest
```

### Requirements

- Repository must have a valid `Dockerfile` in the root directory
- Next.js project should be configured with `output: 'standalone'` in `next.config.ts`
- No additional secrets required - uses `GITHUB_TOKEN` automatically

### Permissions

The workflow requires:
- `contents: read` - To checkout the repository
- `packages: write` - To push images to GHCR

These permissions are automatically granted to the workflow.