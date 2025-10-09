# Quick Migration Guide

## What Changed?

Your repository structure has been reorganized to support multiple projects:

### Old Structure:

```
.
├── server.js          # Single server file
├── index.html         # Portfolio files mixed with server
├── about/
├── images/
└── ...
```

### New Structure:

```
.
├── server/            # 📁 Centralized server (handles all routing)
│   └── index.js
├── portfolio/         # 📁 Your portfolio (isolated)
│   ├── index.html
│   ├── about/
│   ├── images/
│   └── ...
└── [future-project]/  # 📁 Add more projects here
```

## Migration Steps

### Option 1: Automatic Migration (Recommended)

Run the migration script:

```bash
./migrate.sh
```

### Option 2: Manual Migration

Move the files manually:

```bash
# Create portfolio directory
mkdir -p portfolio

# Move portfolio files
mv index.html 404.html about/ images/ public/ scripts/ styles/ portfolio/

# Remove old server.js
rm server.js
```

## After Migration

1. **Test locally:**

```bash
npm run dev
```

Visit http://localhost:3000

2. **Update README:**

```bash
mv README_NEW.md README.md
```

3. **Commit and push:**

```bash
git add .
git commit -m "Restructure repository for multiple projects"
git push
```

4. **Vercel will automatically redeploy** with the new structure

## Adding Future Projects

Example: Adding a calculator app

1. Create folder:

```bash
mkdir calculator
```

2. Add your files:

```
calculator/
├── index.html
├── style.css
└── app.js
```

3. Update `server/index.js`:

```javascript
// Calculator static files
app.use("/calculator", express.static(join(rootDir, "calculator")));

// Calculator route
app.get("/calculator", (req, res) => {
  res.sendFile(join(rootDir, "calculator/index.html"));
});
```

4. Access at: `yourdomain.com/calculator`

## Benefits

✅ Clean separation of projects
✅ Easy to add new projects
✅ Centralized server configuration
✅ Each project is independent
✅ Better organization and maintainability
✅ Same domain, multiple projects

## Need Help?

Check the detailed README.md or server/README.md for more information.
