## Variables & Commands
How to create a file, use variables, and capture system information.

1. Create the file: `vim info.sh` and paste the following code

```bash
#!/bin/bash

# 1. Variables (Storing information)
STUDENT_NAME="Binaya"
SERVER_NAME=$(hostname)

# 2. Command Substitution (Capturing output of a command)
CURRENT_TIME=$(date +%H:%M:%S)

# 3. Output
echo "Hello $STUDENT_NAME!"
echo "You are logged into: $SERVER_NAME"
echo "The current time is: $CURRENT_TIME"
```

2. Run it: `chmod +x info.sh && ./info.sh`

#### What are we doing?

- `#!/bin/bash` : Tells Linux, "Use the Bash interpreter to read this file."
- $(command): This tells Linux to run the command inside the parentheses and save the "answer" into a variable.


## Loops & Logic
Automate a repetitive task. Instead of making 3 folders one by one, let the script do it.

1. Create the file: setup_project.sh
2. Paste this code:
3. 
```bash
#!/bin/bash

# Define a list of folders we want
folders=("frontend" "backend" "database" "logs")

echo "Starting project setup..."

# The Loop: For every name in our list, do the following
for folder in "${folders[@]}"; do
    if [ -d "$folder" ]; then
        echo "⚠️  Folder '$folder' already exists. Skipping."
    else
        mkdir "$folder"
        echo "✅ Created folder: $folder"
    fi
done

echo "Setup complete!"
```

#### What are we doing?
- Array (`"..."`): Storing multiple values in one variable.
- `if [ -d "$folder" ]`: This checks if a Directory already exists. It prevents errors if you run the script twice.
- `for...in`: This tells the computer: "Repeat these steps for every item in my list."


## Real Automation
cleaning up old files

1. Create the file: `cleaner.sh`
2. Paste this code:
```bash
#!/bin/bash

LOG_DIR="/opt/app/logs"
THRESHOLD=5

# Create a fake log directory and files for testing
mkdir -p $LOG_DIR
touch $LOG_DIR/app.log $LOG_DIR/error.log $LOG_DIR/old.log

# Count how many files are in there
count=$(ls $LOG_DIR | wc -l)

echo "Checking logs in $LOG_DIR..."
echo "Found $count log files."

if [ "$count" -gt "$THRESHOLD" ]; then
    echo "Too many logs! Cleaning up..."
    # In a real scenario, we might delete files older than 7 days here
else
    echo "Log count is safe. No action needed."
fi
```

#### What are we doing?

`wc -l`: Word Count - Lines. It counts how many files were listed by ls.

`-gt`: Stands for Greater Than. In Bash, we use letters like -gt or -lt (Less Than) for comparing numbers instead of > or <.

