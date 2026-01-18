# Installation

CMS => Content management system. 
Wordpress => Creates/Stores configuration & all in database.


## Phase 1: Preparing the "Vault" (MySQL)
WordPress needs a dedicated database to store its posts, users, and settings.

Log in to MySQL: `sudo mysql`
Run the Setup Commands:
```bash
CREATE DATABASE wordpress_db;
CREATE USER 'wp_admin'@'localhost' IDENTIFIED BY 'Wp_Secure_Pass_2026!';
GRANT ALL PRIVILEGES ON wordpress_db.* TO 'wp_admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Check if the user is created:
`select user from mysql.user;`

Check the permission of user:
`show grants for wp_admin@"localhost";`

## Phase 2: Downloading the Application
Instead of writing our own PHP code, we are downloading a professional application.

Download and Extract:
```bash
cd /tmp
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
```

Move to Web Directory:
```bash
sudo mkdir -p /var/www/my_wordpress
sudo cp -r wordpress/* /var/www/my_wordpress/
```

## Phase 3: Permissions
For WordPress to work, the "Manager" (PHP-FPM) needs permission to read and write files, but the "Public" should only be able to view them.

**Give ownership to the Web User:**
```bash
sudo chown -R www-data:www-data /var/www/my_wordpress
sudo chmod -R 755 /var/www/my_wordpress
```

## Phase 4: The Nginx Routing
Now we create the "Front Door" for WordPress. This configuration includes a special rule for Permalinks (clean URLs).
1. Create the Config: `sudo nano /etc/nginx/sites-available/wordpress.conf`
2. Paste the Configuration:

```bash
server {
    listen 80;
    server_name myblog.test;
    root /var/www/my_wordpress;
    index index.php index.html;

    location / {
        # This line allows WordPress "Pretty Permalinks" to work
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }

    # Security: Hide sensitive WordPress files
    location ~ /\.ht {
        deny all;
    }
}
```

3. Enable and Reload:
```bash
sudo ln -s /etc/nginx/sites-available/wordpress.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## Important:
Why do we use `try_files $uri $uri/ /index.php?$args;`?
In WordPress, when you visit myblog.test/about-us, there isn't actually a folder called "about-us" on the hard drive. This Nginx line tells the server: "If you can't find a physical file, don't give a 404 error. Instead, give the request to index.php, and let PHP figure out what page to show from the database."
