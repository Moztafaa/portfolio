// Express server for Vercel deployment
// Handles all routes and serves static files

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(__dirname));

// Serve styles and scripts explicitly
app.use("/styles", express.static(join(__dirname, "styles")));
app.use("/scripts", express.static(join(__dirname, "scripts")));
app.use("/images", express.static(join(__dirname, "images")));
app.use("/public", express.static(join(__dirname, "public")));

// Main route - serve index.html
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// About route
app.get("/about", (req, res) => {
  res.sendFile(join(__dirname, "about", "index.html"));
});

// API routes example (for future use)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Future project routes can be added here
// Example:
// app.get('/projects/calculator', (req, res) => {
//     res.sendFile(join(__dirname, 'projects/calculator/index.html'));
// });

// app.post('/api/contact', (req, res) => {
//     const { name, email, message } = req.body;
//     // Process contact form
//     res.json({ success: true });
// });

// 404 handler - must be last
app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, "404.html"));
});

// Start server (for local development and Vercel)
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${__dirname}`);
  console.log(`✨ Your portfolio is live!`);
});

// Export for Vercel
export default app;
