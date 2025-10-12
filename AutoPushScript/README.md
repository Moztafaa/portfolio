# Auto-Push 🚀

A lightweight bash utility that automatically commits and pushes git changes at regular intervals. Perfect for live coding sessions, presentations, or continuous backup scenarios.

## Features

- ✅ Automatic git commit and push at configurable intervals
- ✅ Smart branch detection (works with `main`, `master`, or any branch)
- ✅ Handles new branches that don't exist on remote yet
- ✅ Pull-rebase before push to handle concurrent changes
- ✅ Timestamped commit messages
- ✅ Single-file script, no dependencies beyond bash and git

## Quick Start

### Option 1: Direct Download & Run

```bash
# Download the script
curl -fsSL https://mostafa-ibrahim.me/autoPush -o auto_push.sh
chmod +x auto_push.sh

# Run in your repository (auto-detects current branch)
cd /path/to/your/repo
./auto_push.sh
```

### Option 2: One-Liner (Pipe from Web)

```bash
# Auto-detect branch, default 3-minute interval
cd /path/to/your/repo
curl -fsSL https://mostafa-ibrahim.me/autoPush | bash

# Specify branch and interval
cd /path/to/your/repo
curl -fsSL https://mostafa-ibrahim.me/autoPush | bash -s master 120
```

## Usage

```bash
./auto_push.sh [branch_name] [interval_seconds]
```

### Arguments

- **`branch_name`** (optional): Target branch to push to

  - If not provided, auto-detects your current branch
  - Examples: `main`, `master`, `develop`, `feature/my-feature`

- **`interval_seconds`** (optional): Time between checks in seconds
  - Default: `180` (3 minutes)
  - Minimum recommended: `60` (1 minute)

### Examples

```bash
# Auto-detect branch, check every 3 minutes (default)
./auto_push.sh

# Push to master branch, check every 2 minutes
./auto_push.sh master 120

# Push to main branch, check every 5 minutes
./auto_push.sh main 300

# Push to feature branch, check every 1 minute
./auto_push.sh feature/new-feature 60
```

### Using with Timeout

You can automatically stop the script after a specific duration using the `timeout` command:

```bash
# Run for 1 hour (3600 seconds)
timeout 3600 ./auto_push.sh main 180

# Run for 30 minutes
timeout 30m ./auto_push.sh main 120

# Run for 2 hours
timeout 2h ./auto_push.sh master 180

# Run for 45 minutes with custom interval
timeout 45m ./auto_push.sh develop 60
```

**Timeout format options:**

- `s` for seconds (default): `timeout 300 ./auto_push.sh` (5 minutes)
- `m` for minutes: `timeout 30m ./auto_push.sh` (30 minutes)
- `h` for hours: `timeout 2h ./auto_push.sh` (2 hours)
- `d` for days: `timeout 1d ./auto_push.sh` (24 hours)

**Use cases:**

- ⏰ **Timed presentations**: `timeout 1h ./auto_push.sh main 60` - Auto-stop after your 1-hour talk
- 📚 **Study sessions**: `timeout 2h ./auto_push.sh study 180` - Auto-backup during 2-hour study block
- 🎥 **Live streams**: `timeout 3h ./auto_push.sh stream 120` - Auto-push during your stream duration

## How It Works

1. **Validation**: Checks that you're in a git repository and determines the target branch
2. **Monitoring**: Continuously monitors for changes using `git status --porcelain`
3. **When changes detected**:
   - Stages all changes (`git add .`)
   - Creates a commit with timestamp: `Auto-push for live session: 2025-10-12 07:30:45`
   - Checks if remote branch exists
   - Pulls with rebase if branch exists (to sync with remote changes)
   - Pushes to remote repository
4. **Repeat**: Waits for the configured interval and checks again

## Running in Background

To run the script in the background:

```bash
# Start in background
./auto_push.sh main 180 &

# Check if it's running
jobs

# Stop the background process
kill $(jobs -p)
```

Or use `nohup` to keep it running after logout:

```bash
nohup ./auto_push.sh main 180 > auto_push.log 2>&1 &

# View logs
tail -f auto_push.log

# Stop it
pkill -f auto_push.sh
```

## Use Cases

### 1. Live Coding Sessions

Keep your code backed up automatically while presenting or teaching:

```bash
cd ~/my-workshop
./auto_push.sh workshop-demo 120
# Now focus on coding, changes are auto-saved to git!
```

### 2. Continuous Backup

Automatically backup your work-in-progress:

```bash
cd ~/important-project
./auto_push.sh develop 300
# Your work is continuously backed up every 5 minutes
```

### 3. Collaborative Demos

Keep a shared repository updated in real-time:

```bash
cd ~/team-demo
./auto_push.sh main 60
# Team members can pull frequently to see your changes
```

## Requirements

- **Bash**: Any modern bash shell (included in Linux/macOS/WSL)
- **Git**: Git must be installed and repository initialized
- **Remote**: A remote repository must be configured (e.g., GitHub, GitLab)
- **Authentication**: Git credentials must be configured (SSH keys or HTTPS token)

## Stopping the Script

Press `Ctrl+C` to stop the script gracefully.

## Troubleshooting

### "Error: Not in a git repository"

**Solution**: Make sure you're in a directory that's a git repository:

```bash
cd /path/to/your/repo
git status  # Should show git info, not an error
```

### "Error: Could not determine branch name"

**Solution**: Either specify the branch explicitly or make sure you're on a branch (not detached HEAD):

```bash
git checkout main  # Switch to a branch
./auto_push.sh main  # Or specify explicitly
```

### "Error: Failed to push"

**Possible causes**:

- Network issues: Check your internet connection
- Authentication: Ensure git credentials are configured (`git push` works manually)
- Permissions: Verify you have write access to the repository
- Branch protection: Remote branch might have protection rules

**Solution**: Try pushing manually first to diagnose:

```bash
git push origin main
```

### "Error: Failed to pull changes"

**Cause**: Merge conflicts with remote changes

**Solution**: Stop the script, resolve conflicts manually:

```bash
git pull --rebase origin main
# Resolve any conflicts
git rebase --continue
# Restart the script
./auto_push.sh
```

## Configuration Tips

### Adjust Interval Based on Activity

```bash
# Fast iteration (every 1 minute) - live demos
./auto_push.sh main 60

# Moderate (every 3 minutes) - default, balanced
./auto_push.sh main 180

# Slow (every 10 minutes) - less noise in git history
./auto_push.sh main 600
```

### Git Ignore Recommendations

Add to your `.gitignore` to prevent pushing unwanted files:

```
# Logs
*.log
auto_push.log

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
```

## Security Notes

⚠️ **Important**: This tool stages and commits ALL changes in your repository (`git add .`)

- Ensure sensitive files are in `.gitignore` before running
- Don't use in repositories with secrets, API keys, or credentials
- Review your `.gitignore` file before first run
- Consider using branch-specific workflows for sensitive projects

## FAQ

**Q: Can I use this with private repositories?**
A: Yes! Just ensure your git authentication is configured (SSH keys or HTTPS token).

**Q: Will this create a lot of commits?**
A: Yes, it commits every time changes are detected. Consider using `git rebase` or squashing commits later if needed.

**Q: What happens if I make changes while it's running?**
A: The script will detect and commit your changes on the next interval check.

**Q: Can I run multiple instances in different repositories?**
A: Yes! Each repository can have its own instance running.

**Q: Does it work with Git LFS (Large File Storage)?**
A: Yes, as long as Git LFS is properly configured in your repository.

## Contributing

Found a bug or have a feature request? Contributions are welcome!

## License

This project is open source and available for free use.

## Author

Created by [Mostafa Ibrahim](https://mostafa-ibrahim.me)

---

**Happy auto-pushing! 🚀**
