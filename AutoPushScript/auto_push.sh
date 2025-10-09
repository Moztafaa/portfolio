#!/bin/bash

# This is an infinite loop that will run until you manually stop it.
# while true; do
# 	echo "------------------------------------"
# 	echo "Checking for changes at $(date)"
#
# 	# Check if there are any changes in the working directory.
# 	# The 'if' block will only run if there are changes to commit.
# 	if ! git diff-index --quiet HEAD --; then
# 		echo "Changes found! Preparing to push..."
#
# 		# Add all new and modified files to the staging area.
# 		git add .
#
# 		# Commit the changes with a message that includes the current timestamp.
# 		git commit -m "Auto-commit: $(date)"
#
# 		# Push the changes to the remote repository.
# 		git push -u origin main
#
# 		echo "✅ Push successful!"
# 	else
# 		echo "No changes to commit. Waiting..."
# 	fi
#
# 	# This part now runs on every loop, whether there were changes or not.
# 	echo "Waiting for 3 minutes before next check."
# 	echo "------------------------------------"
#
# 	# Wait for 180 seconds (3 minutes) before the next cycle.
# 	sleep 180
# done

# -----------------------------
#
BRANCH="main" # Replace with your branch
INTERVAL=180  # Interval in seconds (10 minutes)

# cd "$REPO_PATH" || { echo "Error: Cannot access repository path"; exit 1; }

while true; do
	# Check for changes
	if [ -n "$(git status --porcelain)" ]; then
		echo "Changes detected, committing and pushing..."
		git add .
		git commit -m "Auto-push for live session: $(date '+%Y-%m-%d %H:%M:%S')"
		git pull --rebase origin "$BRANCH"
		git push origin "$BRANCH"
		echo "Pushed successfully!"
	else
		echo "No changes to push."
	fi
	sleep "$INTERVAL"
done
