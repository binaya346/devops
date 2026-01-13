# Uncomplicated Firewall (UFW)
## Checking the Status
`sudo ufw status`

- Status: inactive — The guard is asleep. Every door is open.
- Status: active — The guard is awake and following your rules.

## Understanding "Default Policies"
When you first enable UFW, it usually follows these two golden rules:

- Incoming: deny (Stay safe: block everyone trying to get in).
- Outgoing: allow (Stay functional: let the server talk to the world).

⚠️ Warning: If the status is Active and you haven't run `sudo ufw allow ssh`, you might get locked out of your server the next time you try to log in!

## How to see what the Firewall is Blocking
UFW doesn't show you "blocked attempts" in the status command. To see the "attacks" or blocked traffic, you must look at the System Logs.

Step A: Enable Logging
`sudo ufw logging on`

Step B: Read the "Rejection" List
Everything the firewall blocks gets sent to the kernel log. Use this command to see the "live" blocks: `sudo tail -f /var/log/ufw.log`

What to look for in the log:

- SRC: The IP address of the person trying to get in.
- DPT: The Destination Port they were trying to hit (e.g., 22 for SSH, 80 for Web).

## Basic Blocking & Stopping Commands
Once you see an IP address in the logs that looks suspicious, you can stop them specifically.

Block a specific "Bad Actor" (IP Address)
`sudo ufw deny from 123.123.123.123` (This tells the guard: "If you see this specific person, don't even talk to them.")

`sudo ufw allow from 203.0.113.50 to any port 80 proto tcp`

Stop a specific Service
If you want to close a port you previously opened: `sudo ufw delete allow 8080`

Reset Everything
If you make a mess and want to start from zero: `sudo ufw reset`

## Enable firewall
`sudo ufw enable`
