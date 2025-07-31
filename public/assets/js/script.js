document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.querySelector(".navbar");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navbar.classList.toggle("active");
      const icon = this.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-times");
        icon.classList.toggle("fa-bars");
      }
    });
  }

  // Close mobile menu when clicking nav links
  document.querySelectorAll(".navbar ul li a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navbar) navbar.classList.remove("active");
      if (mobileMenuBtn) {
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Header shadow on scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (header) {
      header.style.boxShadow = window.scrollY > 100
        ? document.body.classList.contains("dark-mode")
          ? "0 2px 10px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.1)"
        : "none";
    }
  });

  // Scroll animations
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".feature-card, .project-card, .event-card, .scrani"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize animation styles
  document
    .querySelectorAll(".feature-card, .project-card, .event-card, .scrani")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const mobileFilterSelect = document.getElementById("mobile-filter-select");
  const projectItems = document.querySelectorAll(".project-item");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const filterValue = button.getAttribute("data-filter");
        filterProjects(filterValue);
        if (mobileFilterSelect) mobileFilterSelect.value = filterValue;
      });
    });

    if (mobileFilterSelect) {
      mobileFilterSelect.addEventListener("change", () => {
        const filterValue = mobileFilterSelect.value;
        filterProjects(filterValue);
        filterButtons.forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.getAttribute("data-filter") === filterValue
          );
        });
      });
    }

    function filterProjects(filterValue) {
      projectItems.forEach((item) => {
        const shouldHide = filterValue !== "all" && 
                         item.getAttribute("data-category") !== filterValue;
        item.style.display = shouldHide ? "none" : "block";
      });
    }
  }

  // Dark Mode Toggle
  let darkModeToggle = document.querySelector(".dark-mode-toggle");

  if (!darkModeToggle) {
    darkModeToggle = document.createElement("button");
    darkModeToggle.className = "dark-mode-toggle";
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
  }

  darkModeToggle.addEventListener("click", function() {
    const isDarkMode = document.body.classList.contains("dark-mode");
    if (isDarkMode) {
      disableDarkMode();
      localStorage.setItem("darkModePreference", "light");
    } else {
      enableDarkMode();
      localStorage.setItem("darkModePreference", "dark");
    }
  });

  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    document.documentElement.setAttribute("data-theme", "dark");
    const icon = darkModeToggle.querySelector("i");
    if (icon) {
      icon.classList.replace("fa-moon", "fa-sun");
    }
    updateHeaderShadow();
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    document.documentElement.removeAttribute("data-theme");
    const icon = darkModeToggle.querySelector("i");
    if (icon) {
      icon.classList.replace("fa-sun", "fa-moon");
    }
    updateHeaderShadow();
  }

  function updateHeaderShadow() {
    const header = document.querySelector(".header");
    if (header) {
      header.style.boxShadow = window.scrollY > 100
        ? document.body.classList.contains("dark-mode")
          ? "0 2px 10px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.1)"
        : "none";
    }
  }

  // System preference detection
  function checkSystemPreference() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  // Initialize theme
  function initializeTheme() {
    const userPreference = localStorage.getItem("darkModePreference");
    const systemPreference = checkSystemPreference();

    // Priority 1: User's explicit preference
    if (userPreference) {
      if (userPreference === "dark") enableDarkMode();
      else disableDarkMode();
    } 
    // Priority 2: System preference
    else {
      if (systemPreference === "dark") enableDarkMode();
      else disableDarkMode();
    }
  }

  // Watch for system preference changes (only when no user preference exists)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("darkModePreference")) {
      if (e.matches) enableDarkMode();
      else disableDarkMode();
    }
  });

  // Initialize theme on load
  initializeTheme();

  // Preloader
  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader") || document.createElement("div");
    preloader.className = "preloader";
    preloader.innerHTML = `
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    `;
    
    if (!document.querySelector(".preloader")) {
      document.body.prepend(preloader);
    }

    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      setTimeout(() => preloader.remove(), 500);
    }, 500);
  });
});