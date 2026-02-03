# Introduction
1. Docker Hub: The Public Registry
Docker Hub is the "GitHub for Docker Images."

**Step A:** Account Creation
Go to hub.docker.com.

Sign up with a Docker ID (this will be your namespace).

**Tip:** Rememeber that your image name must start with their Docker ID (e.g., binaya/react-app).

**Step B:** Docker Login & Push
From the terminal, we need to authenticate our local Docker engine:
`docker login`

**To push the image:**
```bash
# 1. Tag the image to match your Docker Hub ID
docker tag my-react-app rijalbinaya2/my-react-app:v1

# 2. Push it
docker push rijalbinaya2/my-react-app:v1
```

**Pulling docker image**
`docker pull rijalbinaya2/my-react-app:v1`

