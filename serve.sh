#!/bin/bash
# Simple local development server

echo "Starting local server..."
echo "Open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Check if Python 2 is available
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Check if PHP is available
elif command -v php &> /dev/null; then
    php -S localhost:8000
else
    echo "Error: No suitable web server found."
    echo "Please install Python or PHP to run the local server."
    exit 1
fi
