// Centralized Express server for multiple projects
// Handles routing to different projects based on path

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const app = express();
const PORT = process.env.PORT || 3001;

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================
// AUTO PUSH SCRIPT ENDPOINT
// ============================================
// Serve the auto_push.sh script as plain text for curl access
app.get("/autoPush", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.sendFile(join(rootDir, "AutoPushScript/auto_push.sh"));
});

// ============================================
// PORTFOLIO PROJECT ROUTES
// ============================================
// Serve portfolio static files
app.use("/portfolio/styles", express.static(join(rootDir, "portfolio/styles")));
app.use(
  "/portfolio/scripts",
  express.static(join(rootDir, "portfolio/scripts"))
);
app.use("/portfolio/images", express.static(join(rootDir, "portfolio/images")));
app.use("/portfolio/public", express.static(join(rootDir, "portfolio/public")));

// Portfolio routes
app.get("/portfolio", (req, res) => {
  res.sendFile(join(rootDir, "portfolio/index.html"));
});

app.get("/portfolio/about", (req, res) => {
  res.sendFile(join(rootDir, "portfolio/about/index.html"));
});

// ============================================
// ROOT DOMAIN - Default to Portfolio
// ============================================
// Serve static files from portfolio at root
app.use("/styles", express.static(join(rootDir, "portfolio/styles")));
app.use("/scripts", express.static(join(rootDir, "portfolio/scripts")));
app.use("/images", express.static(join(rootDir, "portfolio/images")));
app.use("/public", express.static(join(rootDir, "portfolio/public")));

// Root routes default to portfolio
app.get("/", (req, res) => {
  res.sendFile(join(rootDir, "portfolio/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(join(rootDir, "portfolio/about/index.html"));
});

// ============================================
// FUTURE PROJECT ROUTES
// ============================================
// Example structure for adding new projects:
/*
// Project 2 routes
app.use("/project2/static", express.static(join(rootDir, "project2/static")));
app.get("/project2", (req, res) => {
  res.sendFile(join(rootDir, "project2/index.html"));
});
app.get("/project2/*", (req, res) => {
  const path = req.path.replace("/project2/", "");
  res.sendFile(join(rootDir, "project2", path));
});
*/

// ============================================
// 404 HANDLER
// ============================================
app.use((req, res) => {
  res.status(404).sendFile(join(rootDir, "portfolio/404.html"));
});

// Start server (for local development)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Portfolio: http://localhost:${PORT}/`);
    console.log(`About: http://localhost:${PORT}/about`);
  });
}

// Export for Vercel
export default app;
