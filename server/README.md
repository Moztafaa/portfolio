# Server Configuration

This folder contains the centralized Express.js server that routes requests to different projects.

## Structure

- `index.js` - Main server file that handles routing to all projects

## Adding New Projects

To add a new project to this repository:

1. Create a new folder in the root directory (e.g., `my-new-project/`)
2. Add your project files to that folder
3. Update `server/index.js` to add routes for your new project:

```javascript
// Serve static files
app.use(
  "/my-new-project/assets",
  express.static(join(rootDir, "my-new-project/assets"))
);

// Main route
app.get("/my-new-project", (req, res) => {
  res.sendFile(join(rootDir, "my-new-project/index.html"));
});

// Catch-all for project routes
app.get("/my-new-project/*", (req, res) => {
  const path = req.path.replace("/my-new-project/", "");
  res.sendFile(join(rootDir, "my-new-project", path));
});
```

## Local Development

Run the server locally:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Deployment

This server is configured to deploy on Vercel. The `vercel.json` file in the root directory handles the deployment configuration.
