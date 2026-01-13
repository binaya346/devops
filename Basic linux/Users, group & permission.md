# 📂 Linux File Ownership and Permissions: A Comprehensive Guide

This document covers the fundamental concepts of Linux user accounts, groups, and the file permissions system essential for managing secure and collaborative environments in DevOps.

## 1. Core Entities: Users and Groups

Every file and process on a Linux system is tied to an identity. These identities control access and security.

### 1.1 Users (User Owner)

* **Definition:** A single, unique human or service entity on the system (e.g., `binaya`, `root`).
* **User ID (UID):** A unique number assigned to each user (used internally by the system).
    * **Root:** UID 0 (The superuser, or administrative account).
* **Role:** The **User Owner** has the primary control and highest privilege set (the first permission triplet) over a file or directory.

### 1.2 Groups (Group Owner)

* **Definition:** A collection of users that share a common set of access rights (e.g., `devops`, `admins`).
* **Group ID (GID):** A unique number assigned to each group.
* **Role:** The **Group Owner** defines the secondary set of permissions. Any user who is a member of this group inherits the group's rights (the second permission triplet).

---

## 2. File Permission Management

The standard Linux permission model dictates **who** can **read**, **write**, or **execute** a file.

### 2.1 The `ls -l` Command

This command is the primary tool for checking permissions. The output provides the **long listing format**, with the critical 10-character permission string first.

**Example Output Breakdown:**
-rwxr-xr-- 1 binaya devops 1024 Dec 16 10:30 deploy.sh

| Position |          Characters           | Entity/Meaning                                    |
| :------: | :---------------------------: | :------------------------------------------------ |
|  **1**   | **File Type** (`-`, `d`, `l`) | `-` = File, `d` = Directory, `l` = Symbolic Link. |
| **2-4**  | **Owner Permissions** (`rwx`) | The rights of the **User Owner** (Column 3).      |
| **5-7**  | **Group Permissions** (`rwx`) | The rights of the **Group Owner** (Column 4).     |
| **8-10** | **Other Permissions** (`rwx`) | The rights of **all other users** on the system.  |

### 2.2 Standard Permissions: Numeric (Octal) and Symbolic Modes

Permissions are defined by three bits (Read, Write, Execute) corresponding to the numeric values 4, 2, and 1.

| Permission  | Symbol | Numeric Value | Description                                                    |
| :---------: | :----: | :-----------: | :------------------------------------------------------------- |
|  **Read**   |  `r`   |       4       | View contents of file; list contents of directory.             |
|  **Write**  |  `w`   |       2       | Modify/delete file; create/delete/rename files in a directory. |
| **Execute** |  `x`   |       1       | Run a file as a program/script; enter (`cd` into) a directory. |

#### **Example Analysis: `-rw-rw-r--` (Numeric 664)**

|   Entity   | Triplet | Calculation | Numeric Value | Meaning        |
| :--------: | :-----: | :---------: | :-----------: | :------------- |
| **Owner**  |  `rw-`  |   $4+2+0$   |     **6**     | Read and Write |
| **Group**  |  `rw-`  |   $4+2+0$   |     **6**     | Read and Write |
| **Others** |  `r--`  |   $4+0+0$   |     **4**     | Read only      |

---

## 3. Command Utilities

### 3.1 `chown` (Change Ownership)

* **Syntax:** `sudo chown <user>:<group> <file>`
* **Role:** Changes the **User Owner** and/or the **Group Owner**.
* **Example:**
    ```bash
    sudo chown ubuntu:devops file.txt 
    # Sets User Owner to 'ubuntu' and Group Owner to 'devops'.
    ```
* **Important Flag:**
    * `-R`: Recursively apply ownership changes to directories and their contents.

### 3.2 `chmod` (Change Mode/Permissions)

* **Syntax (Numeric):** `chmod <4-digit-octal> <file>`
* **Syntax (Symbolic):** `chmod [ugo][+-=][rwxst] <file>`
* **Example (Numeric):**
    ```bash
    chmod 755 script.sh # Owner=rwx, Group=r-x, Others=r-x
    ```
* **Example (Symbolic):**
    ```bash
    chmod +x deploy.sh  # Adds execute permission to all (user, group, others)
    chmod u+w,o-r data.log # Adds owner write, removes others read
    ```

---

## 4. Advanced Permissions: The Fourth Octal Digit

The first digit of the four-digit octal permission code (e.g., in **`4`**`755`) sets **Special Permissions**, which modify execution behavior or directory access.

### 4.1 Special Permission Bits

| Octal Value |        Bit Name         | Symbolic Mode | Primary Function                                                                                      |
| :---------: | :---------------------: | :-----------: | :---------------------------------------------------------------------------------------------------- |
|    **4**    | **Set User ID (SUID)**  |     `u+s`     | **File:** Process runs with the **Owner's ID** (e.g., `root`).                                        |
|    **2**    | **Set Group ID (SGID)** |     `g+s`     | **Directory:** New files inherit the parent directory's Group Owner (Crucial for team collaboration). |
|    **1**    |     **Sticky Bit**      |     `o+t`     | **Directory:** Prevents non-owners from deleting/renaming files, even if they have write permission.  |

### 4.2 SUID and Running with the Owner's ID

* **What it means:** When a file has the SUID bit set (`chmod 4xxx`), any user who executes the file will have the program run with the **privileges of the file's Owner**.
* **Example:** The `/usr/bin/passwd` command is owned by `root` and has SUID set. This temporarily grants a regular user `root` permissions to modify the secure password file (`/etc/shadow`).


### 4.3 `ls -l` View of Special Bits

The special bits replace the standard execute (`x`) permission in the output:

|                 State                  | Character in `ls -l` | Meaning                                               |
| :------------------------------------: | :------------------: | :---------------------------------------------------- |
|     **SUID/SGID Set + Execute ON**     |   `s` (Lowercase)    | The special bit is active and functional.             |
|    **SUID/SGID Set + Execute OFF**     |   `S` (Uppercase)    | The special bit is set but ineffective for execution. |
| **Sticky Bit Set + Others Execute ON** |   `t` (Lowercase)    | The Sticky Bit is active (e.g., on `/tmp`).           |

### 4.4 Permission Usage with the Fourth Digit

The first digit acts as a **modifier** to the remaining three digits:

|      Position      |          Octal Digit          | Controls                          |
| :----------------: | :---------------------------: | :-------------------------------- |
|   **1st Digit**    | **Special Bits (0, 1, 2, 4)** | **Behavior** (SUID, SGID, Sticky) |
| **2nd-4th Digits** |      **Standard R/W/X**       | **Access** (Owner, Group, Others) |

* **Note on SGID on Directories:** Setting SGID (`2xxx`) on a directory is a common DevOps practice for team shares, as it ensures file group ownership consistency regardless of the creator's primary group.
* **Note on Sticky Bit:** The Sticky Bit is functional on a directory regardless of the Group/Others R/W/X settings, as its job is to prevent file deletion.

## 5. User and Group Management

Managing users and groups is the foundation of Linux security and access control, especially in multi-user environments common in DevOps.

### 5.1 User Account Management

These commands are typically run by the `root` user or a user with `sudo` privileges.

| Command          | Action                               | Syntax                                                                     | Example                               |
| :--------------- | :----------------------------------- | :------------------------------------------------------------------------- | :------------------------------------ |
| **`useradd`**    | **Create** a new user account.       | `sudo useradd [options] <username>`                                        | `sudo useradd -m jenkins_svc`         |
| **`-m` flag**    |                                      | Creates the user's home directory (`/home/username`). **Always use this.** |                                       |
| **`passwd`**     | Set or change a user's password.     | `sudo passwd <username>`                                                   | `sudo passwd jenkins_svc`             |
| **`usermod`**    | **Modify** an existing user account. | `sudo usermod [options] <username>`                                        | `sudo usermod -aG devops jenkins_svc` |
| **`-aG` option** |                                      | Appends the user to the specified supplementary group(s).                  |                                       |
| **`-l` option**  |                                      | Changes the user's login name.                                             | `sudo usermod -l svc_new svc_old`     |
| **`userdel`**    | **Delete** a user account.           | `sudo userdel [options] <username>`                                        | `sudo userdel -r old_user`            |
| **`-r` option**  |                                      | Removes the user's home directory and mail spool (Recommended).            |                                       |

### 5.2 Group Management

Groups are essential for collaboration, as they allow permissions to be applied to a set of users simultaneously.

| Command        | Action                                 | Syntax                                   | Example                              |
| :------------- | :------------------------------------- | :--------------------------------------- | :----------------------------------- |
| **`groupadd`** | **Create** a new group.                | `sudo groupadd <groupname>`              | `sudo groupadd qa_team`              |
| **`groupmod`** | **Modify** an existing group.          | `sudo groupmod -n <new_name> <old_name>` | `sudo groupmod -n webapp_dev devops` |
| **`groupdel`** | **Delete** a group.                    | `sudo groupdel <groupname>`              | `sudo groupdel old_group`            |
| **`groups`**   | **View** the groups a user belongs to. | `groups [username]`                      | `groups binaya`                      |
| **`id`**       | **View** user and group IDs (UID/GID). | `id <username>`                          | `id jenkins_svc`                     |

### 5.3 Key Concepts: Primary vs. Supplementary Groups

1.  **Primary Group:**
    * The first group a user belongs to, specified during creation.
    * It is the **default group owner** for any file the user creates.
    * Can be changed using `usermod -g`.

2.  **Supplementary Group (or Secondary Group):**
    * Any additional groups the user is added to.
    * Used to gain access to files/resources owned by those specific groups (e.g., being a member of the `devops` group to access deployment scripts).
    * Managed with `usermod -aG`.

**Example Scenario:**
A new deployment service user, `deploy_svc`, needs access to files owned by the `devops` group.

```bash
# 1. Create the user and their home directory
sudo useradd -m deploy_svc

# 2. Set the password
sudo passwd deploy_svc

# 3. Add the user to the supplementary 'devops' group
sudo usermod -aG devops deploy_svc

# 4. Verify the groups for the new user
groups deploy_svc
# Output should show: deploy_svc devops