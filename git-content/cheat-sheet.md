# Git DevOps Cheat Sheet
1. Setup & Configuration
Identify yourself to Git. This only needs to be done once per machine.

**Set Username:** `git config --global user.name "Your Name"`

**Set Email:** `git config --global user.email "name@email.com"`

**Check Settings:** `git config --list`

2. Starting a Project
Initialize Local Repo: git init (Run this inside your project folder)

**Clone Remote Repo:** `git clone <url>` (Downloads an existing project)

3. The Daily Workflow (The "Big Three")
Use these commands 90% of the time.

**Check Status:** `git status` (See what files are changed/staged)

**Stage Files:** `git add <file>` (Use git add . to stage everything)

**Commit:** `git commit -m "Describe what you did"` (Saves the snapshot, creating a version)

4. Working with Remotes (GitHub)
**Link to GitHub:** `git remote add origin <url>`

**Push Changes:** `git push origin <branch-name>`

**Pull Updates:** `git pull origin <branch-name>` (Fetches and merges changes)

**View Remotes:** `git remote -v`

5. Branching & Merging
Never work directly on 'main'. Always create a branch for new features.

**Create Branch:** `git branch <branch-name>`

**Switch Branch:** `git checkout <branch-name>`

**Create & Switch:** `git checkout -b <branch-name>`

**Merge into Current:** `git merge <branch-name>`

**Delete Branch:** `git branch -d <branch-name>`

6. Advanced DevOps Tools
**Stash Changes**: `git stash` (Temporarily hide changes to work on something else)

**Pop Stash:** `git stash pop` (Bring hidden changes back)

**Rebase:** `git rebase main` (Moves your branch to the tip of main for a clean history)

**Cherry Pick:** `git cherry-pick <commit-hash>` (Grab one specific fix/commit from another branch)

**Squash:** Often done during a Pull Request on GitHub to keep the history clean.

7. Undo & Reset (The "Safety Net")
**Undo git add:** `git reset <file>`

**Undo last commit (keep changes):** `git reset --soft HEAD~1`

**Discard all local changes:** `git reset --hard HEAD` (Warning: This deletes work!)

8. Git Log & Inspection
**History:** `git log`

**One-line History:** `git log --oneline --graph --all` (Visualizes branches)

**Show File Changes:** `git diff`

💡 Pro-Tips for Students
**Commit Often:** Small, frequent commits are easier to debug than one giant commit.

**Clear Messages:** Write `git commit -m "Fix login button bug"` instead of `git commit -m "update".`

**Pull Before Push:** Always run `git pull` before you `git push` to ensure you have the latest code.
