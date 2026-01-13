# 🛠️ The Linux Text Processing Toolkit: Filter, Extract, and Transform

This document provides a comprehensive guide to the four most essential text processing utilities in Linux: **`grep`** (Filtering), **`cut`** (Simple Column Extraction), **`sed`** (Substitution), and **`awk`** (Advanced Field Processing). Mastery of these tools is fundamental for scripting, log analysis, and configuration management.

## 1. Preparation: The Example Data

To practice and demonstrate these tools, we will use a sample inventory file, `inventory.txt`, simulating server data separated by whitespace.

### **Command to Create the Data File**

Run the following commands on your server:

```bash
# Create the file and add data
cat << EOF > inventory.txt
web-01    us-east-1    running    4GB    v1.2
db-05     eu-west-2    stopped    8GB    v1.0
app-03    us-east-1    running    8GB    v1.2
cache-10  ap-south-1   running    16GB   v1.5
EOF
```

# Display the content to verify
```bash
binaya@ubuntu:~$ cat inventory.txt
```


# 2. GREP (Global Regular Expression Print)
Purpose: To filter lines that match a specified pattern (Regular Expression).

Basic Filtering
Action: Prints lines containing the specified pattern.

Example: Find all servers that are currently running.
-i (Ignore Case): Ignores case during the search.
```bash
binaya@ubuntu:~$ grep running inventory.txt
binaya@ubuntu:~$ grep -i Web inventory.txt
```


-v (Invert Match): Prints lines that DO NOT contain the pattern. Useful for excluding certain entries.
`binaya@ubuntu:~$ grep -v running inventory.txt`

-c (Count): Counts only the number of matching lines.
`binaya@ubuntu:~$ grep -c us-east-1 inventory.txt`

-n (Line Number): Prints the matching lines along with their line numbers.
`binaya@ubuntu:~$ grep -n db inventory.txt`

# 3. CUT
Purpose: To extract columns (fields) or sections from each line of text based on a simple delimiter. Best used for quick, simple column extraction where the delimiter is consistent.

# Extraction by Field (-f)
Action: Specifies the Field(s) to extract (column number).

Example: Extract only the Hostname (1st field) and RAM (4th field).
```bash
# Note: For files with variable whitespace, often piped through 'tr -s' first
binaya@ubuntu:~$ cat inventory.txt | tr -s ' ' | cut -d ' ' -f 1,4
```

=> `cut -d ' '`: Tells cut to use a single space as a delimiter (the separator between columns).

=> `tr -s ' '`: This is the squeeze command. It takes any sequence of multiple spaces and "squeezes" them into one single space.

=> `-f 1,4`: Asks for field 1 and field 4.

# Specifying the Delimiter (-d)
Action: Defines the character that separates the fields.

Example: Extract the second field using a comma as the delimiter.
```bash
binaya@ubuntu:~$ echo "user\_a,10.0.0.1,dev" | cut -d ',' -f 2
# Output: 10.0.0.1
```

# Extraction by Character (-c)
Action: Extracts a specific character or range of characters by their position.

Example: Extract the first three characters of a string.
```bash 
binaya@ubuntu:~$ echo "Deployment" | cut -c 1-3
# Output: Dep
```

# 4. SED (Stream Editor)
Purpose: To perform automatic, non-interactive substitutions (replacements) or deletions on text streams.

Basic Syntax
The most common syntax for substitution is: `sed 's/pattern/replacement/flags' filename`

Key Operations
Substitution (s command): Replaces the first match of a pattern on each line.

```bash
# Replace the status 'running' with 'UP'
binaya@ubuntu:~$ sed 's/running/UP/' inventory.txt
```

For every line in inventory.txt, sed finds all occurrences of the string running and replaces them with UP.

The changes are not written back to inventory.txt. They are printed to the terminal screen (standard output). This is the default, safe way to run sed—you can preview your changes before making them permanent.

`s` => Substitute command: Tells sed to find and replace.

```bash
binaya@ubuntu:~$ sed -i 's/running/UP/g' inventory.txt
```
`-i` => With this flat the changes are written back and saved to the original file, inventory.txt. This is how you automate editing configuration files.

`g` => Flag (Global): Important! Tells sed to replace all occurrences of pattern on a line, not just the first one. 

# 5.  AWK
`awk` processes text according to this pattern: `awk 'condition { action }' file`

If you don't provide a condition, it performs the action on every line.

Key Built-in Variables:
`$0`: Represents the entire current line.

`$1, $2, $n`: Represents specific fields (columns).

`NR`: Number of Records (Current line number).

`NF`: Number of Fields (How many columns are in the current line).

`FS`: Field Separator (Default is any whitespace).

1. Print Specific Columns (Basic)
Unlike cut, we don't need tr to clean up the spaces. awk handles it automatically.
```bash
binaya@ubuntu:~$ awk '{print $1, $4}' inventory.txt
Output: 
        web-01 4GB
        db-05 8GB
        app-03 8GB
        cache-10 16GB 
```

2. Search for a Pattern (Condition)
Print the first and second columns, but only for servers that are "running".
```bash
binaya@ubuntu:~$ awk '/running/ {print $1, $2}' inventory.txt
Output: 
        web-01 us-east-1 
        app-03 us-east-1
```

3. Adding Row Numbers (NR)
Useful for making lists.
```bash
binaya@ubuntu:~$ awk '{print NR, $1}' inventory.txt
Output: 
        1 web-01
        2 db-05
        3 app-03
        4 cache-10
```

4. Logic/Math Operations
`awk` can handle calculations. Let’s say you want to see if a field equals a specific value.
```bash
binaya@ubuntu:~$ awk '$4 == "8GB" {print $1 " has 8GB RAM"}' inventory.txt
```

`-f` => Field Separator: Change the delimiter (e.g., for CSV files). 
`binaya@ubuntu:~$ awk -F ',' '{print $1}' file.csv`

`-v` => Variable: Pass an external shell variable into awk.
`binaya@ubuntu:~$ limit=8; awk -v x=$limit '$4 == x"GB"' inventory.txt`

# Advanced Structure: BEGIN and END
`awk` allows us to run code before it starts reading the file and after it finishes.
Example: Creating a Report
```bash
binaya@ubuntu:~$ awk 'BEGIN {print "---SERVER REPORT---"} {print $1 " is " $3} END {print "---END OF LIST---"}' inventory.txt

Output:
---SERVER REPORT---
web-01 is running
db-05 is stopped
app-03 is running
cache-10 is running
---END OF LIST---
```
What happens here:
BEGIN: Prints the header once.
Body: Runs for every line in inventory.txt.
END: Prints the footer once.


