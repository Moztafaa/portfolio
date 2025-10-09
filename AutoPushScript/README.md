# Auto Push Script

This script automatically commits and pushes changes to a Git repository at regular intervals.

## Usage

### Direct Download and Execute

You can download and run this script directly using curl:

```bash
curl -fsSL https://mostafa-ibrahim.me/autoPush | sh
```

### Local Usage

Or download it first and run it:

```bash
curl -fsSL https://mostafa-ibrahim.me/autoPush -o auto_push.sh
chmod +x auto_push.sh
./auto_push.sh
```

## What It Does

The script will:

1. Check for changes in your Git repository
2. If changes are found:
   - Add all changes to staging
   - Commit with a timestamp
   - Pull with rebase from origin
   - Push to origin
3. Wait for the specified interval (default: 180 seconds / 3 minutes)
4. Repeat indefinitely

## Configuration

You can modify these variables in the script:

- `BRANCH`: The branch to push to (default: "main")
- `INTERVAL`: Time between checks in seconds (default: 180)

## Requirements

- Git must be installed
- You must be in a Git repository
- Git credentials must be configured
- The repository must have a remote named "origin"

## Stopping the Script

Press `Ctrl+C` to stop the script at any time.
