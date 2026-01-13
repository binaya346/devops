# Create a new user in the server. 
sudo useradd -m developer

# Update existing user to provide the bash access
sudo usermod -s /bin/bash developer

# Create a .ssh directory inside the home directory and create authorized_keys. 
/home/developer# mkdir .ssh
/home/developer# cd .ssh
/home/developer/.ssh# touch authorized_keys

# Update ownership & permission for the directory & files. 

**Path:** /home/developer
**Ownership:** developer:developer,
**Permission:** 755 or stricter (owner rwx, group r-x, other r-x)

**Path:** /home/developer/.ssh
**Ownership:** developer:developer
**Permission:** 700

**Path:** /home/developer/.ssh/authorized_keys
**Ownership:** developer:developer
**Permission:** 600


$ chown -R developer:developer /home/developer
$ chmod 755 /home/developer
$ chmod 700 /home/developer/.ssh
$ chmod 600 /home/developer/.ssh/authorized_keys

Paste the public keys of the user in the **authorized_keys** file. 

# Delete the user

userdel -r developer