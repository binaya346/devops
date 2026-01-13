# Installations

### What is PHP-FPM?
PHP: The programming language.
FPM (FastCGI Process Manager): This is a specialized tool that manages PHP processes.

In the old days, every time a visitor came to a website, the server had to start a brand-new PHP program from scratch, which was very slow. PHP-FPM is like keeping a car engine idling at a red light. When the light turns green (a request comes in), the car is already running and ready to move instantly.

It handles "traffic spikes" by managing multiple "workers." If 100 people visit at once, PHP-FPM wakes up 100 workers to handle the load.

1. Step 1: Install the Stack
Log into your VM with vagrant ssh and run the following commands:
```bash
# Update and install PHP
sudo apt update
sudo apt install php-fpm php-mysql -y
```

1. Creating the Nginx Configuration
We will create a clean configuration file that tells Nginx how to handle standard web requests and where to "hand off" PHP files.

   1. Create the file: `sudo nano /etc/nginx/sites-available/devopsclass`

   2. Paste this basic configuration

```bash
server {
    listen 80;
    server_name devopsclass.com;

    # Where your website files are stored
    root /var/www/devopsclass;
    index index.php index.html;

    # Handle standard requests
    location / {
        try_files $uri $uri/ =404;
    }

    # Handle PHP files
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
    }
}
```

3. Creating the PHP Application
Now, let's create the folder and a PHP file that displays server's details.

   1. Create the file: `sudo vim /var/www/devopsclass/index.php`
   2. Paste this code:
   
```bash
    <?php
    echo "<h1>Welcome to the PHP Backend</h1>";
    echo "<p>Nginx received your request and forwarded it to me.</p>";
    echo "<b>Server IP:</b> " . $_SERVER['SERVER_ADDR'] . "<br>";
    echo "<b>Protocol used:</b> " . $_SERVER['REQUEST_SCHEME'];
    ?>
```


//
High level langauge (PHP) = Understood by human. 
Machine level language / Binary = Understod by machine.

PHP => Compiler => Machine Level => Execute => Output


express
express.listen(5000)