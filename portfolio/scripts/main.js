// Main JavaScript for Portfolio - Modern Interactions

/**
 * Initialize the portfolio when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  initSmoothScroll();
  initSocialLinkAnimations();
  initProfileImageEffect();
  initScrollReveal();
  initLanguageSwitcher();
  initAboutModal();
  initTaglineRotation();
});

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
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
          block: "center",
        });
      }
    });
  });
}

/**
 * Add staggered animation to social links
 */
function initSocialLinkAnimations() {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link, index) => {
    // Staggered fade-in animation
    link.style.opacity = "0";
    link.style.transform = "translateY(20px)";

    setTimeout(() => {
      link.style.transition =
        "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      link.style.opacity = "1";
      link.style.transform = "translateY(0)";
    }, 800 + index * 100);

    // Add ripple effect on click
    link.addEventListener("click", function (e) {
      createRipple(e, this);
    });
  });
}

/**
 * Create ripple effect for button clicks
 */
function createRipple(event, element) {
  const circle = document.createElement("span");
  const diameter = Math.max(element.clientWidth, element.clientHeight);
  const radius = diameter / 2;

  const rect = element.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple");

  // Add ripple styles dynamically
  circle.style.position = "absolute";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
  circle.style.transform = "scale(0)";
  circle.style.animation = "ripple-animation 0.6s linear";
  circle.style.pointerEvents = "none";

  // Ensure parent has position relative and overflow hidden
  element.style.position = "relative";
  element.style.overflow = "hidden";

  const existingRipple = element.querySelector(".ripple");
  if (existingRipple) {
    existingRipple.remove();
  }

  element.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
}

/**
 * Add interactive effect to profile image
 */
function initProfileImageEffect() {
  const profileImage = document.querySelector(".profile-image");

  if (!profileImage) return;

  // 3D tilt effect on mouse move
  profileImage.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  profileImage.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  });
}

/**
 * Reveal elements on scroll with intersection observer
 */
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe navigation links
  document.querySelectorAll(".nav-link").forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(15px)";
    el.style.transition = `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
      1.2 + index * 0.1
    }s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${1.2 + index * 0.1}s`;

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);

    observer.observe(el);
  });
}

/**
 * Add dynamic styles for ripple animation
 */
(function addRippleStyles() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
})();

/**
 * Typing effect for tagline (optional - can be enabled)
 */
function initTypingEffect() {
  const tagline = document.querySelector(".profile-tagline");
  if (!tagline) return;

  const text = tagline.textContent;
  tagline.textContent = "";
  tagline.style.visibility = "visible";

  let i = 0;
  const typeSpeed = 50;

  function typeWriter() {
    if (i < text.length) {
      tagline.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, typeSpeed);
    }
  }

  // Start typing after initial animations
  setTimeout(typeWriter, 1000);
}

// Uncomment to enable typing effect:
// initTypingEffect();

/**
 * Handle keyboard navigation for accessibility
 */
document.addEventListener("keydown", function (e) {
  // Enable navigation with Enter and Space for custom interactive elements
  if (e.key === "Enter" || e.key === " ") {
    const activeElement = document.activeElement;
    if (
      activeElement.classList.contains("social-link") ||
      activeElement.classList.contains("nav-link")
    ) {
      e.preventDefault();
      activeElement.click();
    }
  }
});

/**
 * Language Switcher - English/Arabic toggle like Luay's portfolio
 */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll(".lang-btn");
  const translatableElements = document.querySelectorAll("[data-en][data-ar]");
  const htmlElement = document.documentElement;

  // Check for saved language preference
  const savedLang = localStorage.getItem("preferredLanguage") || "en";
  setLanguage(savedLang);

  langBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      setLanguage(lang);
      localStorage.setItem("preferredLanguage", lang);
    });
  });

  function setLanguage(lang) {
    // Update active button
    langBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Update HTML lang and direction
    htmlElement.setAttribute("lang", lang);
    htmlElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // Update body class for RTL styling
    document.body.classList.toggle("rtl", lang === "ar");

    // Translate all elements with data attributes
    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) {
        // Hide paragraphs with empty Arabic text in Arabic mode
        if (lang === "ar" && text === "") {
          el.style.display = "none";
        } else {
          el.style.display = "";
          if (text) {
            el.textContent = text;
          }
        }
      }
    });

    // Update page title
    if (lang === "ar") {
      document.title = "مصطفى إبراهيم السيد - مطور خلفية";
    } else {
      document.title = "Mostafa Ibrahim Elsayed - Backend Developer";
    }
  }
}

/**
 * Add RTL specific styles dynamically
 */
(function addRTLStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .rtl {
      font-family: Arial, Helvetica, sans-serif;
    }

    .rtl .profile-section {
      direction: rtl;
    }

    .rtl .profile-name {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 400;
    }

    .rtl .profile-tagline {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 300;
    }

    .rtl .nav-links {
      direction: rtl;
    }

    .rtl .nav-link {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 400;
    }

    .rtl .social-links {
      direction: ltr;
    }

    .rtl .footer p {
      font-family: Arial, Helvetica, sans-serif;
    }
  `;
  document.head.appendChild(style);
})();

/**
 * About Modal - Popup like Luay's portfolio
 */
function initAboutModal() {
  const aboutLink = document.getElementById("about-link");
  const modal = document.getElementById("about-modal");
  const closeBtn = document.getElementById("modal-close");

  if (!aboutLink || !modal || !closeBtn) return;

  // Open modal when clicking About link
  aboutLink.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
  });

  // Close modal when clicking X button
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Close modal when clicking outside content
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/**
 * Tagline Rotation - Show funny text first, then switch to professional
 */
function initTaglineRotation() {
  const tagline = document.querySelector(".profile-tagline");
  if (!tagline) return;

  const currentLang = localStorage.getItem("preferredLanguage") || "en";

  // Set initial funny text based on current language
  const initialText = tagline.getAttribute(`data-${currentLang}-initial`);
  if (initialText) {
    tagline.textContent = initialText;
  }

  // After 3 seconds, switch to the professional text with a fade effect
  setTimeout(() => {
    tagline.style.transition = "opacity 0.5s ease";
    tagline.style.opacity = "0";

    setTimeout(() => {
      const professionalText = tagline.getAttribute(`data-${currentLang}`);
      if (professionalText) {
        tagline.textContent = professionalText;
      }
      tagline.style.opacity = "1";
    }, 500);
  }, 3000);
}
