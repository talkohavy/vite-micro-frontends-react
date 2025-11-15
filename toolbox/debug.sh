#!/bin/bash

# Get the absolute path to the project directory
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

osascript <<EOF
tell application "iTerm"
    activate
    
    # Create new window
    create window with default profile
    
    # Run host in first pane
    tell current session of current window
        write text "cd '$PROJECT_DIR/apps/host' && pnpm dev"
    end tell
    
    # Split vertically for booksMF
    tell current session of current window
        split vertically with default profile
    end tell
    tell second session of current tab of current window
        write text "cd '$PROJECT_DIR/apps/booksMF' && pnpm dev"
    end tell
    
    # Split vertically for fruitsMF
    tell second session of current tab of current window
        split vertically with default profile
    end tell
    tell third session of current tab of current window
        write text "cd '$PROJECT_DIR/apps/fruitsMF' && pnpm dev"
    end tell
    
    # Split vertically for dragonsMF
    tell third session of current tab of current window
        split vertically with default profile
    end tell
    tell fourth session of current tab of current window
        write text "cd '$PROJECT_DIR/apps/dragonsMF' && pnpm dev"
    end tell
    
    # Split vertically for webpackMF
    tell fourth session of current tab of current window
        split vertically with default profile
    end tell
    tell fifth session of current tab of current window
        write text "cd '$PROJECT_DIR/apps/webpackMF' && pnpm dev"
    end tell
end tell
EOF