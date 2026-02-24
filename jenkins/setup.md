This is a critical step. Standard Jenkins images (`jenkins/jenkins:lts`) do **not** come with Docker installed. Since our course requires us to "Dockerize" applications *using* Jenkins, a standard `docker run` isn't enough—the Jenkins container needs the ability to run `docker build`.

Here is the **Production-Grade** setup for a DevOps Lab environment. We will use a **Custom Docker Image** to ensure Docker CLI is installed and permissions are handled correctly.

### 1. The Project Structure

Tell students to create a folder named `jenkins-setup`:

```text
jenkins-setup/
├── Dockerfile          # Custom image definition
├── docker-compose.yml  # The orchestrator
└── .env                # Secrets (optional)

```

---

### 2. The Custom Dockerfile

We need to extend the official Jenkins image to install the Docker CLI client inside it. This allows Jenkins to type `docker build` commands.

**File:** `jenkins-setup/Dockerfile`

```dockerfile
FROM jenkins/jenkins:lts

USER root

# 1. Install Docker CLI
# We need this to run 'docker build' commands inside the pipeline
RUN apt-get update && \
    apt-get install -y docker.io

# 2. (Optional) Install Maven manually if you prefer not to use the Global Tool Config
# RUN apt-get install -y maven

# 3. Clean up to reduce image size
RUN apt-get clean

# Switch back to the standard Jenkins user for security
# Note: In some lab setups, you might keep this as ROOT to avoid socket permission issues,
# but 'jenkins' is the production standard.
USER jenkins

```

---

### 3. The Production `docker-compose.yml`

This file configures persistence, memory limits (to prevent crashing), and the critical **Docker Socket Binding**.

**File:** `jenkins-setup/docker-compose.yml`

```yaml
version: '3.8'

services:
  jenkins:
    build: .  # Uses the Dockerfile in the current directory
    container_name: jenkins_server
    restart: unless-stopped
    privileged: true # Required for Docker-in-Docker operations in some setups
    user: root # Avoids "Permission Denied" errors on the Docker Socket for students
    ports:
      - "8080:8080"   # Web UI
      - "50000:50000" # Agent communication
    volumes:
      # 1. Persist Jenkins Data (Plugins, Jobs, Users)
      - jenkins_home:/var/jenkins_home
      
      # 2. The "Docker Bridge" (Crucial for DevOps)
      # This allows the Jenkins container to use the HOST's Docker engine
      - /var/run/docker.sock:/var/run/docker.sock
      
      # 3. (Optional) Mount Host Maven Repo to speed up builds (caching)
      # - ~/.m2:/root/.m2
    environment:
      # Prevent Jenkins from eating all your RAM
      - JAVA_OPTS=-Xmx2048m -Djava.awt.headless=true
    networks:
      - devops-net

volumes:
  jenkins_home:

networks:
  devops-net:
    driver: bridge

```

---

### 4. Explanation of the "Magic" Configuration

#### **A. `user: root` (The Student Saver)**

* **Why:** By default, the `jenkins` user inside the container does not have permission to touch `/var/run/docker.sock`. This results in `permission denied` errors when the pipeline tries to run.
* **The "Pro" Fix:** Create a special group ID mapping.
* **The "Classroom" Fix:** Run the container as `root`. It is less secure but guarantees the lab works smoothly without complex Linux permission debugging.

#### **B. `/var/run/docker.sock` (Docker-outside-of-Docker)**

* **Concept:** We are not running "Docker inside Docker." We are simply giving the Jenkins container a "Remote Control" to the Docker Engine running on your MacBook/Linux host.
* **Result:** When Jenkins runs `docker build`, the image is actually built on your host machine, not inside the tiny Jenkins container.

#### **C. `JAVA_OPTS=-Xmx2048m**`

* **Why:** Jenkins loves RAM. Without a limit, it can consume all available memory and crash your student's laptop. This limits it to 2GB.

---

### 5. How to Run It

Tell your students to execute these commands inside the `jenkins-setup` folder:

```bash
# 1. Build the custom image and start the server
docker compose up -d --build

# 2. Check logs to get the Initial Admin Password
docker logs jenkins_server

```

### 6. Verification Step

Once up, ask students to run this **inside** the Jenkins container to prove it can talk to Docker:

```bash
docker exec -it jenkins_server docker ps

```

**Success:** They should see a list of running containers (including Jenkins itself!). This proves the connection to the host is working.