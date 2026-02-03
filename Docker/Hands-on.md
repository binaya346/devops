1. Installation and Configuration
To begin, we must prepare the host environment. We are installing the Docker Engine on Ubuntu.

Step 1: System Update & Installation

# Update the local package index
`sudo apt update`

# Install Docker.io (The engine that manages containers)
`sudo apt install docker.io -y`

# Start and enable the service so it runs on boot
`sudo systemctl start docker`
`sudo systemctl enable docker`

Step 2: User Privilege Configuration
By default, the Docker daemon binds to a Unix socket owned by root. To avoid using sudo for every command (a DevOps best practice), add your user to the docker group:

`sudo usermod -aG docker $USER`
Note: Students must log out and log back in (or run newgrp docker) for this to take effect.

1. Docker Operations: CLI Manual
A container follows a strict lifecycle. Students must understand what happens at each stage.

`docker pull <image>`: Downloads a read-only template (Image) from Docker Hub.

`docker images`: Lists all images stored in the local storage of the Host VM.

`docker run`: The most complex command. It creates a writeable layer over the image and starts the process.

Example: `docker run -d -p 8080:80 --name web-prod nginx:alpine`

`-d`: Detached mode (Runs as a background process).

`-p` 8080:80: Port forwarding. Binds Host `IP:8080` to Container `IP:80`.

`docker ps`: Shows running containers. Use `-a` to see stopped ones.

`docker exec -it <name> sh`: Opens an interactive terminal inside the running container for debugging.

`docker stop/rm`: Stops the process and removes the container instance.

3. Creating Production-Grade Dockerfiles
A Dockerfile is an automation script that builds a Docker Image. We will use two specific examples: Node.js (Single-stage) and Java (Multi-stage).

A. Node.js 24 (LTS) Implementation
We use node:24-alpine. Alpine Linux is a security-oriented, lightweight Linux distribution (~5MB) which reduces the attack surface of our "Invisible" backend.

```bash

# STEP 1: Use the latest stable LTS version on a tiny footprint (Alpine)
FROM node:24-alpine

# STEP 2: Create and set the directory where our app will live
# This folder is created by 'root' by default
WORKDIR /usr/src/app

# STEP 3: Optimized Layer Caching
# We copy package files first so we don't re-install libraries every time we change code
COPY package*.json ./

# STEP 4: Install only production-ready packages
RUN npm ci --only=production

# STEP 5: Bring the application code into the container
# At this point, all files in /usr/src/app are owned by 'root'
COPY . .

# STEP 6: Transfer of Ownership (The Hands-on Step)
# We are currently 'root', so we have the power to change file owners.
# We give the 'node' user control over the application folder.
RUN chown -R node:node /usr/src/app

# STEP 7: Security - Drop Privileges
# We stop being 'root' and become the 'node' user for the rest of the execution
USER node

# STEP 8: Open the "Invisible" port and start the server
EXPOSE 3000
CMD ["node", "server.js"]
```

B. Java 21 (Multi-Stage Build)
Technical Problem: To build Java, you need Maven (300MB+). To run Java, you only need the JRE (100MB). Solution: Multi-stage builds. We use a heavy image to build and a light image to run.

Dockerfile
```bash
# STAGE 1: The Build Environment (Heavy)
FROM maven:3.9-eclipse-temurin-21-alpine AS build_stage
# It has heavy tools like JDK. 
WORKDIR /app
# Copy the project descriptor and source
COPY pom.xml .
COPY src ./src
# Compile the code and create the .jar file (Artifact)
RUN mvn clean package -DskipTests

# STAGE 2: The Runtime Environment (Light)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
# We copy ONLY the .jar from the previous stage. 
# The Maven tools and source code are discarded, keeping the image 'Invisible' to hackers.
COPY --from=build_stage /app/target/*.jar app.jar

# Security: Dedicated system user
RUN addgroup -S devopsgroup && adduser -S devopsuser -G devopsgroup
USER devopsuser

ENTRYPOINT ["java", "-jar", "app.jar"]

```
4. Container Networking & Types
Docker creates a virtual network stack for containers to communicate.

**Bridge (Default):** A private internal network. Containers get IPs like 172.17.0.x. They can talk to each other via IP or Service Name (if using Docker Compose).

**Host:** The container shares the host's networking namespace. There is no port mapping; if the app runs on 80, it is 80 on the VM.

**None:** The container has no network access. Used for isolated batch jobs.

**Overlay:** Connects multiple Docker daemons (used in Docker Swarm or Kubernetes).

**Hands-on: Creating a Custom Network**
In production, we create User-Defined Bridge Networks. This allows containers to talk to each other using their Container Names as hostnames.


# 1. Create a private network named 'devops-net'
`docker network create devops-net`

# 2. Verify the network exists
`docker network ls`

**Hands-on: Assigning Networks via CLI**
Let's use the Node.js and Java images we built in the previous section. We will run them in our new network.

Example A: Running the Node.js Server
```Bash

docker run -d \
  --name node-app \
  --network devops-net \
  -p 3000:3000 \
  my-node-app:v1

```
Example B: Running the Java App
```Bash

docker run -d \
  --name java-service \
  --network devops-net \
  -p 8080:8080 \
  my-java-app:v1

```

# Diff between entrypoint & cmd command:
In Docker, both ENTRYPOINT and CMD define what happens when a container starts, but they serve different purposes in terms of "Strictness" and "Flexibility."

## The Core Concept
ENTRYPOINT: Think of this as the Command. It is the "hardcoded" purpose of the container. It is not easily ignored.

CMD: Think of this as the Default Parameter. It provides a default instruction that the user can easily override when starting the container.

Over ridding cmd command. 
`docker run devops-java-service java --version`

What happened here?
- Docker ignored `["java", "-jar", "app.jar"]`.
- Docker executed `java --version` instead.
- The container printed the version and stopped.

# Testing connection between two containers in same network:

# Log into the Node container
`docker exec -it node-app sh`

# Use ping to see if the Java container is visible by NAME
`ping java-service`


5. Persistent Storage: Volumes & Bind Mounts
By default, data in a container is ephemeral (lost if the container is deleted).

**Bind Mounts:** You map a path on your Host to a path in the container.

**Command:** `docker run -v /var/log:/usr/src/app/logs node-app`
(container) /usr/src/app/logs => info.log
(host) /var/log => info.log

**Visualization:** The container thinks it's writing to its own disk, but the data is physically streaming to your Host's hard drive.

**Named Volumes:** Managed by Docker. Best for databases.

volume => Storage space in our computer/host. 

**Command:** `docker run -v mysql_data:/var/lib/mysql mysql:8.0`

1. Docker Compose: Provisioning the Stack
Docker Compose is an orchestrator that uses a YAML file to manage multiple services.

docker-compose.yml
```bash

version: '3.8'
services:
  backend-api:
    build: .
    ports:
      - "8080:3000"
    environment:
      - DB_URL=db-service # DNS Resolution handles the IP automatically
    networks:
      - private-net
    # Technical Logic: Ensures db-service starts before backend-api
    depends_on:
      - db-service

  db-service:
    image: postgres:16-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - private-net

networks:
  private-net: # This network is invisible to the public internet
    driver: bridge

volumes:
  postgres_data:
```

1. Docker Registry (Hub & Harbor)
**Docker Hub:** A public registry. You tag your image and push it to make it available globally.

**Harbor Registry:** An enterprise-grade private registry.

**Security Scanning:** Harbor uses Trivy to scan images for vulnerabilities before you deploy them.

Why use it? It keeps your company’s proprietary code "Invisible" from the public Docker Hub.

8. Best Practices & Security Summary
Principle of Least Privilege: Always use USER <non-root-user>.

**Immutability:** Never use docker exec to change configurations in production. Rebuild the image instead.

**Secrets:** Never use ENV for passwords in a Dockerfile. Use docker-compose environment files or a Secret Manager (Harbor/Vault).

**Dynamic Environments:** Pass .env files at runtime so one image works for Dev, QA, and Prod.

# Pull image
docker pull mysql
docker pull nginx

# See all docker images
docker images

# Running a container using mysql image.
docker run -d -p 8080:80 --name web-prod mysql

# Running a container using mysql image with environment variable. 
docker run -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_RANDOM_ROOT_PASSWORD=1 --name mysql-server mysql:latest

# Running a container using nginx image with environment variable. 
docker
  run
  -d
  -p 8000:80
  --name nginx-server
  nginx

# Docker container list
`docker ps` => Lists all running container
`docker ps -a` => Lists all the containers (running + stopped)

# Running container stop:
`docker stop <container_name> | <container_id>`

`docker rm <container_name> | <container_id>`

Container => running | stopped

# Start a stopped container:
`docker start <container_name> | <container_id>`

# Check the logs of the application running inside the container
`docker logs <container_name> | <container_id>`

use `-f` flag to check the live logs

`docker logs -f <container_name> | <container_id>`

# Enter inside a docker container using following command
`docker exec -it <container_name> | <container_id> sh`

# Connect with postgres
`psql -U <username> -d <database>`

show all tables
`\dt;`

describe table
`\d <table_name>;`