# Installing packages
If you are running application without docker, first you need to install node packages.

`npm i` 

# Running the project
`node index.js`

# Running the project using docker. 
Build 
`docker build -t node-app .`

Run
`docker run -p 8080:5050 --name node-application node-app`

