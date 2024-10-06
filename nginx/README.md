# Nginx Reverse Proxy with Docker

This guide shows how to build and run an Nginx reverse proxy using Docker.

## Steps to Build and Run

### 1. Run the Nginx Container for development environment

```sh
yarn nx nginx docker-run-dev
```

- Runs the container in the background.
- Maps host port `80` to container port `8080`.

### 2. Deploy the nginx to docker hub

```sh
yarn nx nginx deploy
```

### 3. Access the Proxy

- Open your browser and go to `http://localhost` to access the reverse proxy.

## Notes

- Edit the `nginx.conf` file before building to adjust proxy settings.
- Edit the `nginx.dev.conf` file before building to adjust development proxy settings.

- Use `docker ps` to find your running container ID.
