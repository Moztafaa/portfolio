// Main JavaScript for Portfolio

// Skills data
const skills = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "SQL Server",
  "PostgreSQL",
  "Entity Framework",
  "LINQ",
  "TypeScript",
  "JavaScript",
  "Express.js",
  "REST APIs",
  "Neovim",
  "Rider",
  "VSCode",
  "Linux",
  "Go (exploring)",
  "Angular (exploring)",
];

// Populate skills list
function populateSkills() {
  const skillsList = document.getElementById("skills-list");

  if (!skillsList) return;

  skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill;
    li.className =
      "px-3 py-1 rounded-full bg-secondary text-secondary-foreground border border-border";
    li.style.backgroundColor = "hsl(var(--secondary))";
    li.style.color = "hsl(var(--secondary-foreground))";
    li.style.borderColor = "hsl(var(--border))";
    skillsList.appendChild(li);
  });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  populateSkills();

  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

// Optional: Dark mode toggle functionality
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark-mode")
  );
}

// Check for saved dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.documentElement.classList.add("dark-mode");
}
