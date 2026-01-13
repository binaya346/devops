# Storage Management with LVM

1. What is LVM?
LVM is a layer between the operating system and the physical hard drives. It turns physical disks into "software-defined storage."
- **Without LVM**: Partitions are fixed. If `/var/log` is full, you have to shut down the server, move data, and resize partitions (risky!).
- **With LVM**: You can add a new hard drive to a "pool" and instantly give more space to any partition while the server is still running.

2. The Three Layers (The Building Blocks)
To understand LVM, you must understand the hierarchy. Think of it like **Water:**
- **PV (Physical Volume):** The Bucket. This is your actual raw hard drive (e.g., `/dev/sdb`).
- **VG (Volume Group):** The Water Tank. You pour all your buckets into one big tank. Now you don't see "disks," you just see a "pool of space."
- **LV (Logical Volume):** The Glass of Water. You pour exactly how much you need from the tank into a glass. This is the part you actually format and use.

3. Step-by-Step Configuration
**Step 1: Initialize the Physical Disk (PV)**
First, tell Linux that `/dev/sdb` is now part of the LVM system. `sudo pvcreate /dev/sdb`

**Step 2: Create the Pool (VG)**
Create a Volume Group named storage_pool using that disk. `sudo vgcreate storage_pool /dev/sdb`

**Step 3: Create the Partition (LV)**
Take 10GB out of that pool to create a volume for your app data. `sudo lvcreate -L 100G -n app_data storage_pool`

**Step 4: Make it Usable (Format & Mount)**
Just like a USB drive, you must format it before use.
`sudo mkfs.ext4 /dev/storage_pool/app_data`
`sudo mkdir /mnt/app`
`sudo mount /dev/storage_pool/app_data /mnt/app`


## Troubleshooting: "No device found for /dev/sdb"
If you run the pvcreate command and see this error, don't panic! It is a very common situation in Linux administration.

### What is the reason?
This error happens because Linux is looking for a physical "object" (a second hard drive) that isn't there. This usually occurs for one of two reasons:

- The disk is missing: You haven't physically or virtually "plugged in" a second hard drive to the server yet.
- The name is different: Your system might have named the disk something else (like `/dev/vdb` on Cloud servers or `/dev/nvme1n1` on modern SSDs).

### How to fix it:
Step 1: Check your hardware "Vision" Run the lsblk command. This shows you every disk the server can actually "see."

`lsblk`

