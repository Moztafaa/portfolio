// Main JavaScript for Portfolio - Modern Interactions

/**
 * Initialize the portfolio when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
  initSmoothScroll();
  initSocialLinkAnimations();
  initProfileImageEffect();
  initScrollReveal();
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
