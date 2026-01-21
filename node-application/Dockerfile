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
EXPOSE 5050
CMD ["node", "index.js"]