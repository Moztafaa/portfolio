# Mostafa Ibrahim Elsayed - Portfolio

A clean, minimal portfolio website powered by Express.js and deployed on Vercel.

## 🚀 Live Site

**https://mostafa-ibrahim.me**

## 🚀 Features

- **Express.js Server**: Full server-side routing and API support
- **Deployed on Vercel**: Fast, reliable, and globally distributed
- **Custom Domain**: Available at mostafa-ibrahim.me
- **Auto Deployment**: Pushes to GitHub automatically deploy to Vercel
- **Tailwind CSS**: Modern utility-first CSS framework
- **Responsive Design**: Works on all devices
- **SEO Friendly**: Proper meta tags and structured data

## 📁 Project Structure

```
├── index.html          # Main portfolio page
├── 404.html           # 404 error page
├── styles/
│   └── main.css       # Custom styles and CSS variables
├── scripts/
│   └── main.js        # JavaScript for dynamic content
└── public/
    └── lovable-uploads/  # Images and assets
```

## 🎨 Customization

### Colors

Colors are defined as CSS custom properties in `styles/main.css`. To customize the color scheme, modify the `:root` variables:

```css
:root {
  --background: 53 33% 95%;
  --foreground: 0 0% 28%;
  --link: 0 88% 41%;
  /* ... more colors */
}
```

### Content

Edit the content directly in `index.html`. The skills section is dynamically generated from the `skills` array in `scripts/main.js`.

### Skills

To add or remove skills, edit the `skills` array in `scripts/main.js`:

```javascript
const skills = [
  "C#",
  ".NET",
  // Add your skills here
];
```

## 🌐 Deployment

This site is deployed on **Vercel** with Express.js:

### Quick Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Automatic Deployment

Connected to GitHub - every push to `main` automatically deploys to production.

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed setup instructions.

## �️ Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Visit http://localhost:3000
```

## 📝 Adding Routes

Edit `server.js` to add new routes:

```javascript
app.get("/your-route", (req, res) => {
  res.sendFile(join(__dirname, "your-page.html"));
});
```

Commit and push - Vercel auto-deploys!

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/1522aa15-a3fe-49db-bcf5-38fa58aa393b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
