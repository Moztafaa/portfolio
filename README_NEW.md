# Monorepo for Multiple Projects

This repository hosts multiple projects on a single domain with centralized routing.

## 🏗️ Structure

```
.
├── server/                 # Centralized Express.js server
│   ├── index.js           # Main server file with routing logic
│   └── README.md          # Server documentation
├── portfolio/             # Portfolio website
│   ├── index.html
│   ├── 404.html
│   ├── about/
│   ├── images/
│   ├── public/
│   ├── scripts/
│   └── styles/
├── package.json           # Node.js dependencies
├── vercel.json           # Vercel deployment config
└── README.md             # This file
```

## 🚀 Getting Started

### Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser:
   - Portfolio: http://localhost:3000/
   - About: http://localhost:3000/about
   - Health Check: http://localhost:3000/api/health

### Deployment

This project is configured for Vercel deployment:

1. Push your changes to GitHub
2. Vercel will automatically deploy your changes
3. Your domain will serve all projects

## 📦 Adding New Projects

To add a new project:

1. **Create a new folder** for your project in the root directory:

```bash
mkdir my-new-project
```

2. **Add your project files** to that folder:

```
my-new-project/
├── index.html
├── styles/
├── scripts/
└── assets/
```

3. **Update `server/index.js`** to add routes for your new project:

```javascript
// Serve static files
app.use(
  "/my-new-project/styles",
  express.static(join(rootDir, "my-new-project/styles"))
);
app.use(
  "/my-new-project/scripts",
  express.static(join(rootDir, "my-new-project/scripts"))
);
app.use(
  "/my-new-project/assets",
  express.static(join(rootDir, "my-new-project/assets"))
);

// Main route
app.get("/my-new-project", (req, res) => {
  res.sendFile(join(rootDir, "my-new-project/index.html"));
});

// Catch-all for other routes in the project
app.get("/my-new-project/*", (req, res) => {
  const path = req.path.replace("/my-new-project/", "");
  res.sendFile(join(rootDir, "my-new-project", path));
});
```

4. **Test locally** and deploy!

## 🌐 URL Structure

- **Root Domain** (`/`): Serves the portfolio (default project)
- **Portfolio** (`/portfolio`): Portfolio website (also accessible at root)
- **New Projects**: Add projects at `/{project-name}` paths

Examples:

- `yourdomain.com/` → Portfolio
- `yourdomain.com/about` → Portfolio About page
- `yourdomain.com/project2` → Your second project
- `yourdomain.com/calculator` → A calculator app
- `yourdomain.com/blog` → A blog

## 🛠️ Technology Stack

- **Backend**: Express.js (Node.js)
- **Hosting**: Vercel
- **Version Control**: Git/GitHub

## 📝 Notes

- The root domain (`/`) defaults to the portfolio project
- Each project is isolated in its own folder
- The server handles all routing centrally
- Static files are served efficiently
- Easy to add, remove, or update individual projects

## 👤 Author

Mostafa Ibrahim Elsayed

## 📄 License

MIT
