# Create the Python Script
```bash
sudo mkdir -p /opt/app
sudo nano /opt/app/status_checker.py

```

## Python code
```bash
import time
import datetime
import sys

print("Status Checker Service is starting up...")

while True:
    current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    print(f"[{current_time}] Health Check: OK")
    
    # CRITICAL: Python buffers output. We must flush it to see logs in real-time.
    sys.stdout.flush()
    
    time.sleep(10)

```

# Create Service file:
```bash
sudo nano /etc/systemd/system/logger.service
```

## Configuration
```bash
[Unit]
Description=Standard Status Logger
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /opt/app/status_checker.py
Restart=always
# Wait 5 seconds before restarting after a crash
RestartSec=5
User=root
WorkingDirectory=/opt/app

[Install]
WantedBy=multi-user.target

[Install]
# Start this service when the system reaches normal operating mode
WantedBy=multi-user.target
```

## Changes
```bash
sudo systemctl daemon-reload
sudo systemctl restart logger
sudo systemctl enable logger
```

## Journalctl

Check the last few logs: `sudo journalctl -u logger.service -n 20`
Follow live (The most used command): `sudo journalctl -u logger.service -f`
See logs since the server last rebooted: `sudo journalctl -u logger.service -b`

## Tip

If you want to stop the service, you cannot just kill the Python process, because Systemd will bring it back. To truly stop it, you must talk to the 'Coach'":

`sudo systemctl stop logger`
