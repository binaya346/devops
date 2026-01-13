1. Clone the repo: git clone <url>
2. Create new branch => feature-1
3. Make changes, 
4. Stage the change: git add .
5. Commit the change: git commit -m 'message here..'
6. Push the changes to remote repository: git push origin feature-1
7. Create PR
8. Rebase your feature branch with main branch: git rebase origin/main
9. Merge the changes, (Make sure we are doing fast forward merge.): git checkout main && git merge feature-1