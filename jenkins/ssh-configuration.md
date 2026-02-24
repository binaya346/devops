# Generate SSH Key Pair on Your Jenkins Server

Step 1: SSH into Your Jenkins Server
bash
# SSH into the machine where Jenkins is running
ssh your-user@your-jenkins-server

# Or if Jenkins is in Docker, exec into the container
docker exec -it jenkins_server bash
Step 2: Generate SSH Key Pair
```bash
# Switch to jenkins user (if not already)
su - jenkins

# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "jenkins-deployment-key" -f ~/.ssh/jenkins_deploy_key

# Press Enter for no passphrase (automated deployments need no passphrase)
# Press Enter again to confirm
```

# You'll see:
# Your identification has been saved in `/var/jenkins_home/.ssh/jenkins_deploy_key`
# Your public key has been saved in `/var/jenkins_home/.ssh/jenkins_deploy_key.pub`
Step 3: View the Keys
```bash
# View PRIVATE key (this goes to Jenkins credentials)
cat ~/.ssh/jenkins_deploy_key

# View PUBLIC key (this goes to production server)
cat ~/.ssh/jenkins_deploy_key.pub
```

Step 4: Copy PUBLIC Key to Production Server
On your production server (185.199.53.175):
```bash
# SSH into production server
ssh root@185.199.53.175  # or your current user

# Create deployer user if doesn't exist
sudo useradd -m -s /bin/bash jenkins
sudo usermod -aG docker jenkins

# Switch to jenkins user
sudo su - jenkins

# Create SSH directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add the PUBLIC key (copy from Jenkins server)
vim ~/.ssh/authorized_keys
# Paste the content from: jenkins_deploy_key.pub
# Save and exit (Ctrl+X, Y, Enter)

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys

# Exit back to your user
exit
```

---

## **Step 5: Add PRIVATE Key to Jenkins**

**Manage Jenkins → Credentials → System → Global → Add Credentials**

```bash
Kind        : SSH Username with private key
ID          : deployment-server-ssh
Username    : deployer
Private Key : ✓ Enter directly
              [Paste the ENTIRE content from jenkins_deploy_key]
              
              -----BEGIN OPENSSH PRIVATE KEY-----
              b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAACFwAAAA
              ... (lots of lines) ...
              -----END OPENSSH PRIVATE KEY-----

Description : Production Server SSH Key
```

## Step 6: Install SSH-Agent plugin from jenkins

`https://plugins.jenkins.io/ssh-agent`