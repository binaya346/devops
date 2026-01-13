## Git
## Version control.

1. Write code in local computer. 
2. There is one project, 3 developers are working on it. 
3. Developer 1 is working on page 1, dev 2 is working on page 2, dev 3 is working on page 3. 

## Problem
1. Dev 1 completed his work on page 1 but his computer crashed on the day of delivery. He lost his code. 
2. Dev 1 is working on a feature in page 1 and dev 2 needs same feature for his page 2.
3. Dev 4 is onboarded in the company, we need to handover the code to dev 4 now, who will handover him the code ? Who will have the complete code ?
4. Dev 1 wrote a code, which has bug & production is down. Now, how will we know who has written the code that made production down. 
5. We need to revert the code to previous version, how to revert ?

 ## Solution

Version control

1. Write code, push => Version 1
2. Again write code, push => version 2. 
3. If version control mechanism is in cloud, our code will be secured & easy to share. 

For each project, version control will create a repository (Where code lives)

Dev 1,2,3 =>  will pull code from cloud repository
After work is done => will push code to cloud repository. 


## Git
Git is a version control. 
We can track, share, backup our code using version control. 

## Github, bitbucket, Gitlab
These all are cloud provider who provides the managed GIT service. 

## Git concept

1. Creating repository
=> Initiatize the project & store the project in cloud provider like github, bitbucket, gitlab. 

2. Clone
=> Pull the repository in the local machine. 
`git clone <repository url>`
`git clone https://github.com/binaya346/js-004.git`

3. Create a new branch
`git checkout -b <branch_name>`
`git checkout -b sachin`

Use `-b` flag to create new branch. If you want to switch to existing branch then run:
`git checkout <branch_name>`

4. Do changes, write code, test. 
   Do random change
   
5. Stage the code:
=> Staging the code means, your code is ready to create a new version. 
`git add <file_name>`

Or select & stage all the changed files using:
`git add .`

1. Commit
=> Creates a version for the code & write the commit message for the version. 
`git commit -m 'adds greeting script'`

adds contact page. 

1. Push
=> Pushes your local code to remote repository. [The repository situated in the github, bitbucker or gitlab cloud is called remote repository]
[The repository situated in your local computer is called local repository]
`git push origin <branch_name>`





