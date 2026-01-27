# Initialize node js application

# Download & install node js & npm. 
Go to `https://nodejs.org/en/download`

Download LTS version of nodejs for your OS (mac|windows|linux)

# Verify download

Check node js version `node -v` 
Check npm version `npm -v`

# Create a directory
`mkdir node-application`

Open the directory in vs code. 
Open terminal in vs code.

# Initilize the node js
`npm init --y`

# Install express framework
`npm i express`

# Writing dockerfile
`vim Dockerfile`

# Build the dockerfile
Docker build will create a docker image. It uses Dockerfile to create image.  

`docker build -t node-application:latest .` 

# Run the image
`docker run -p 8090:5050 --name node-application node-application:latest`