#!/bin/bash

# Migration script to move portfolio files to the portfolio folder
# This script will organize your current files into the new structure

echo "Starting migration to monorepo structure..."

# Create portfolio directory if it doesn't exist
mkdir -p portfolio

# Move portfolio-specific files
echo "Moving portfolio files..."
mv index.html portfolio/ 2>/dev/null || echo "index.html already moved"
mv 404.html portfolio/ 2>/dev/null || echo "404.html already moved"
mv about portfolio/ 2>/dev/null || echo "about/ already moved"
mv images portfolio/ 2>/dev/null || echo "images/ already moved"
mv public portfolio/ 2>/dev/null || echo "public/ already moved"
mv scripts portfolio/ 2>/dev/null || echo "scripts/ already moved"
mv styles portfolio/ 2>/dev/null || echo "styles/ already moved"

# Remove old server.js (replaced by server/index.js)
if [ -f "server.js" ]; then
    echo "Removing old server.js (replaced by server/index.js)..."
    rm server.js
fi

# Remove old serve.sh if exists
if [ -f "serve.sh" ]; then
    echo "Removing old serve.sh..."
    rm serve.sh
fi

echo ""
echo "Migration complete! ✅"
echo ""
echo "New structure:"
echo "📁 Root"
echo "  ├── 📁 server/        (Centralized server configuration)"
echo "  ├── 📁 portfolio/     (Your portfolio website)"
echo "  ├── 📄 package.json   (Updated)"
echo "  ├── 📄 vercel.json    (Updated)"
echo "  └── 📄 README.md      (Updated)"
echo ""
echo "To test locally, run: npm run dev"
echo "To deploy, commit and push to your repository."
echo ""
