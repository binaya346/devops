
# Step 1: Create DockerHub Credentials 
Manage Jenkins → Credentials → Global → Add Credentials
Kind        : Username with password
ID          : dockerhub-credentials
Username    : rijalbinaya2
Password    : your-dockerhub-password-or-token
Description : DockerHub Registry

# Step 2: Create SSH Credentials
Manage Jenkins → Credentials → Global → Add Credentials
Kind        : SSH Username with private key
ID          : deployment-server-ssh
Username    : deployer
Private Key : [Paste your SSH private key]
Description : Production Server SSH

# Step 3: Setup SSH on Production Server
On your production server (185.199.53.175):
bash# Create deployer user if doesn't exist
`sudo useradd -m -s /bin/bash jenkins`
`sudo usermod -aG docker jenkins`

# Add your Jenkins public key
```bash
sudo su - jenkins
mkdir -p ~/.ssh
chmod 700 ~/.ssh
```

# Paste your Jenkins public key here
```bash
echo "your-jenkins-public-key" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

# Test SSH from Jenkins server
```bash
exit
ssh deployer@185.199.53.175  # Should work without password
Step 4: Setup Database on Production Server
On 185.199.53.175:
bash# Start PostgreSQL container
docker run -d \
    --name postgres-prod \
    --restart unless-stopped \
    -p 5432:5432 \
    -e POSTGRES_DB=proddb \
    -e POSTGRES_USER=produser \
    -e POSTGRES_PASSWORD=your-secure-password \
    -v postgres-data:/var/lib/postgresql/data \
    postgres:15-alpine

# Set environment variables for deployer user
sudo su - deployer
cat >> ~/.bashrc << 'EOF'
export DB_USER=produser
export DB_PASSWORD=your-secure-password
EOF
source ~/.bashrc
```

### **Step 5: Create CD Pipeline in Jenkins**

**Dashboard → New Item**
```
Name: devops-java-cd
Type: Pipeline (NOT Multibranch)
```

**Configure:**
```
Pipeline Definition: Pipeline script from SCM
SCM: Git
Repository URL: https://github.com/binaya346/devops-java.git
Branch: main
Script Path: Jenkinsfile.cd

Build Triggers:
✓ GitHub hook trigger for GITScm polling
```

### **Step 6: Configure GitHub Webhook**

**GitHub → Repo → Settings → Webhooks**
```
Payload URL: https://your-jenkins-url/github-webhook/
Content type: application/json
Events: Just the push event
Active: ✓
```

---

## **How It Works:**
```
1. Developer pushes to 'main' branch
   ↓
2. GitHub sends webhook to Jenkins
   ↓
3. CD pipeline triggers automatically
   ↓
4. Jenkins builds Docker image (tagged with commit SHA)
   ↓
5. Jenkins pushes to DockerHub
   ↓
6. [OPTIONAL] Pipeline pauses for approval
   ↓
7. Jenkins SSHs to 185.199.53.175
   ↓
8. Production server pulls image from DockerHub
   ↓
9. Production server stops old container
   ↓
10. Production server starts new container (with DB connection)
    ↓
11. Health check verifies deployment
    ↓
12. ✅ DONE - Live in production!
