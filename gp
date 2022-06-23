#!/bin/bash

# Gets CL argument and passes it as commit message. For more than one word, wrap them in single or double quotes.
# Do not forget to configure git to ignore this file, else it will be pushed to github.
message="$1"

# Uses current date and time as commit message if commit message is not passed.
if [[ -z "${message}" ]]
    then
        message=$(date '+%Y-%m-%d %H:%M:%S')
fi

# Stages all changes.
git add .
echo "Staged all files."

# Uses commit message.
git commit -m "$message"
echo "Added commit with message: '$message'"

# Gets current branch and pushes to it. 
current_branch=$(git branch | sed -ne 's/^\* \(.*\)/\1/p')
git push origin "$current_branch"
echo "Pushed changes to '$current_branch' branch."
