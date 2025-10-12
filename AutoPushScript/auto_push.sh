#!/bin/bash

# -----------------------------
# Parse command line arguments
BRANCH="${1:-$(git branch --show-current)}" # Use first argument or detect current branch
INTERVAL="${2:-180}"  # Interval in seconds (default: 3 minutes)

# Validate we're in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
	echo "Error: Not in a git repository"
	exit 1
fi

# Validate branch name was provided or detected
if [ -z "$BRANCH" ]; then
	echo "Error: Could not determine branch name"
	echo "Usage: $0 [branch_name] [interval_seconds]"
	echo "Example: $0 master 180"
	exit 1
fi

echo "Starting auto-push on branch: $BRANCH (interval: ${INTERVAL}s)"
echo "Press Ctrl+C to stop"
echo "------------------------------------"

while true; do
	# Check for changes
	if [ -n "$(git status --porcelain)" ]; then
		echo "[$(date '+%H:%M:%S')] Changes detected, committing and pushing..."
		git add .
		git commit -m "Auto-push for live session: $(date '+%Y-%m-%d %H:%M:%S')"

		# Check if remote branch exists
		if git ls-remote --heads origin "$BRANCH" | grep -q "$BRANCH"; then
			# Remote branch exists, pull with rebase to sync
			if ! git pull --rebase origin "$BRANCH"; then
				echo "Error: Failed to pull changes. Please resolve conflicts manually."
				exit 1
			fi
		else
			echo "Remote branch '$BRANCH' doesn't exist yet, will create it on first push."
		fi

		# Push changes (use -u flag for first push to set upstream)
		if git push -u origin "$BRANCH"; then
			echo "✅ Pushed successfully to $BRANCH!"
		else
			echo "Error: Failed to push to $BRANCH. Check your permissions and branch name."
			exit 1
		fi
	else
		echo "[$(date '+%H:%M:%S')] No changes to push."
	fi
	sleep "$INTERVAL"
done
