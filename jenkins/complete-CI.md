# Step 1: Setup jenkins.
1. Get the jenkins project from the repo `git clone https://github.com/binaya346/jenkins-setup.git`: 
2. Setup the jenkins in local using docker compose
3. Run `docker compose up --build -d` or `docker-compose up --build -d`

# Step 2: Setup Ngrok
1. Ngrok is used to expose the jenkins running on localhost to internet. 
2. Create free account in ngrok site: `https://ngrok.com/`
3. Download the ngrok in your local computer based on your os: `https://ngrok.com/download`
4. Setup the ngrok Auth in local along with the domain name

# Step 3: Handshake between github & Jenkins
1. Generate the PAT in github account. 
2. Add the same PAT in jenkins credentials;
   1. Add as secret text
   2. Add as username password
3. Install github plugin in jenkins
4. Add the github server in the jenkins system

# Step 4: Adding jenkins hooks in github
1. Go to the github repository for the application for which you want to create CI/CD. 
2. Go to setting & add the webhook in the repo `https://<url>/github-webhook/`
3. Check `Enable SSL verification`
4. Select individual events
   1. Pull requests
   2. Pushes

# Step 5: Setup the Multibranch pipeline
1. Go to Jenkins & create multibranch pipeline
2. Pipeline setup
```bash
Branch Sources
- Credentials: Select the previously setup credentails (Username/password)
- Repository HTTPS URL: Put the github url of the project whose CI/CD you want to setup: https://github.com/binaya346/pythong-sample
- Validate: Click validate & make sure credentials are ok
- Behaviour: 
    - Discover branches Strategy: All branches
    - Discover pull requests from origin Strategy:  The current pull request revision
    - Clean before checkout: Delete untracked nested repositories
    - Prune stale remote-tracking branches
- Build Configuration:
    - Mode: by Jenkinsfile
    - Script Path: Jenkinsfile
- Orphaned Item Strategy
    - Discard old items: 7 & 10. 
```

# Step 6: Testing
1. Add the sample pipeline (Groovy syntax) in root of the github project with filename `Jenkinsfile`. This filename should match the `Script Path:` of the build configuration
2. Now whenever you push changes or create PR in the github project, Pipeline will run and run the groovy script. 