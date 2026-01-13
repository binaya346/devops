## Tar (Archive)
tar stands for Tape Archive. This creates `.tar` file. It is the most common tool in Linux for bundling files.

Create: `tar -cvf logs.tar /var/log`
Extract: `tar -xvf logs.tar`

### Flags
1. -c: Create
2. -x: Extract
3. -v: Verbose (show me what's happening)
4. -f: Bundled filename

## Tar + gz (Archive + Compress)
This creates a `.tar.gz` file (often called a "Tarball"). This is the industry standard for backups.
- Create: `tar -czvf data.tar.gz /opt/app/data`
- Extract: `tar -xzvf data.tar.gz`

Note: The -z flag tells tar to use gzip to shrink the file while bundling it.

## Fast Shrinking (gzip)

`gzip` is used for single files. Warning: Unlike `tar`, when you gzip a file, it deletes the original and replaces it with the .gz version!

- Compress: `gzip setup.sh` (Result: `setup.sh.gz`)
- Decompress: `gunzip setup.sh.gz` (Result: `setup.sh`)

## 4. The Windows-Friendly Way: zip & unzip
We use zip when we need to send files to a Windows user or a colleague who doesn't use Linux often.

- Compress a folder: `zip -r backup.zip /home/binaya/scripts`
    The `-r` means recursive *(include everything inside the folder).*
- Decompress: `unzip backup.zip`