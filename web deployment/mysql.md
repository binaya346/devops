# Installation

1. Install MySQL Server
First, we install the database engine.
```bash
sudo apt update
sudo apt install mysql-server -y
```

2. Secure the Installation
By default, a fresh MySQL installation has some security holes (like a root user without a password). We run a built-in script to lock it down.
`sudo mysql_secure_installation`

Guidance for during the script:
- Validate Password Plugin: Say Yes. This forces users to create strong passwords.
- There are three levels of password validation policy: You can choose medium or strong.
- Remove Anonymous Users: Say Yes.
- Disallow Root Login Remotely: Say Yes. (This ensures the database stays Invisible to the public internet).
- Remove Test Database: Say Yes.
- Reload Privilege Tables: Say Yes.

3. Create a Database and User (The DevOps Way)
As we discussed, we never use the "Root" user for our PHP applications. We create a specific "Service User."

Enter the MySQL shell:
`sudo mysql`

Run these SQL commands:
```bash
-- Create the database
CREATE DATABASE devops_db;

-- Create a user (Replace 'password' with something strong)
CREATE USER 'devops_user'@'localhost' IDENTIFIED BY 'StrongPass123!';

-- Give the user permission to only this database
GRANT ALL PRIVILEGES ON devops_db.* TO 'devops_user'@'localhost';

-- Apply and Exit
FLUSH PRIVILEGES;
EXIT;
```

## The Host: 'localhost' vs '%'
In MySQL, a user's identity isn't just their name; it's Name + Where they are coming from. This is the "Host" part of the user definition.

### 'devops_user'@'localhost'
**Meaning:** This user can only log in if they are sitting inside the same server where the database is installed.
**Security (The Invisible Principle):** Even if a hacker knows the username and password, they cannot connect from their own laptop. They would have to hack into your Linux server first. This is the most secure setting.

### 'devops_user'@'%'
**Meaning:** The % is a wildcard (like a "star"). It means "Anywhere."
**Usage:** This allows the user to connect from a different server, a remote office, or a cloud tool (like MySQL Workbench on your Mac).
**Risk:** This makes the database "Visible" to the internet. In production, we almost never use % for the root user.

1. Connect PHP to MySQL
Now we need to prove that the "PHP" can talk to the "MySQL" We will use the php-mysql extension

Create a test file: `sudo nano /var/www/devopsclass/db_test.php`
Paste this PHP code:
```bash
<?php
    $servername = "localhost";
    $username = "devops_user";
    $password = "StrongPass123!";
    $dbname = "devops_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    echo "<h1>Connected successfully to MySQL!</h1>";
    echo "<p>The PHP engine is now communicating with the Database Vault.</p>";
?>
```

