# Installation of node & npm. 

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash`

`source ~/.bashrc`

`nvm install --lts`

## Check the version of node & npm
`node -v` => 24.x.x
`npm -v` => 11.x.x


# Create a directory called express
`cd /var/www`
`sudo mkdir express`

# Running node + express (Backend framework for JS)

First initiate the package.json file. This file will include all the dependencies & their version used in the application. 

`sudo npm init -y`

Install the package called express. 
`sudo npm i express`

You will see two files:
`package.json`: stores the information of dependencies used in app. 
`package-lock.json`: stores the informaiton of dependencies(package) & all the dependencies of dependency. 

You will see the folder Node_modules:
It will store the actuall code of all the dependency & dependencies of dependency. 

# Create index.js file:

`sudo vim index.js`

Paste the below code there:
```bash

const express = require("express")

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!! Our first node js program')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

```

# Run the node js file, it will run on port 3000. 

`node index.js`

# Test the running nodejs file

`curl localhost:3000`

# Configuring proxy server.

Create a `express` file inside `/etc/nginx/sites-available`
paste the following code:
```bash

server {
    listen 80;
    server_name express.com; 

    location / {
        # This is the magic line
        proxy_pass http://127.0.0.1:3000;

        # These headers pass the user's real info to the backend app
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $schema;
    }
}

```

Now save it & run the sybolic link cmd. 

`sudo ln -s /etc/nginx/sites-available/express.com /etc/nginx/sites-enabled/`

Check syntax & reload

`sudo nginx -t`
`sudo systemctl reload nginx`

Update your domain in VM `/etc/hosts/`
`127.0.0.1  express.com`

Update your domain in Host also
`<VM_ip> express.com`