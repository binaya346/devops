1. Create github account
2. Provide email used to create github account
3. Go to you github account => user icon (top right corner) => Settings => SSH & GPG Key => Add your ssh key & give name to that key
4. You have to go to virtual environment to get your ssh key: cd .ssh => cat id_rsaxxx.pub
5. Copy the ssh key, paste in the git (In step 3)
6. Go to the link of repo, (you will be taken there once you accept the repo invitation from github)
7. Click on Code => SSH => Copy the link of repo. 
8. Go to your virtual box => cd Desktop => 
9. git clone <url>