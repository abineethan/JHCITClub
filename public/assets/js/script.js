document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.querySelector(".navbar");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navbar.classList.toggle("active");
      this.querySelector("i").classList.toggle("fa-times");
      this.querySelector("i").classList.toggle("fa-bars");
    });
  }

  document.querySelectorAll(".navbar ul li a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navbar) navbar.classList.remove("active");
      if (mobileMenuBtn) {
        mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      }
    });
  });

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

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (header) {
      if (window.scrollY > 100) {
        header.style.boxShadow = document.body.classList.contains("dark-mode")
          ? "0 2px 10px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.1)";
      } else {
        header.style.boxShadow = "none";
      }
    }
  });

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

  document
    .querySelectorAll(".feature-card, .project-card, .event-card, .scrani")
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "all 0.6s ease";
    });

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

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
        item.classList.toggle(
          "hide",
          filterValue !== "all" &&
            item.getAttribute("data-category") !== filterValue
        );
      });
    }
  }

  let darkModeToggle = document.querySelector(".dark-mode-toggle");

  if (!darkModeToggle) {
    darkModeToggle = document.createElement("button");
    darkModeToggle.className = "dark-mode-toggle";
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkModeToggle);
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem("darkMode");
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "enabled" || (!savedTheme && systemPrefersDark)) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }

  darkModeToggle.addEventListener("click", toggleDarkMode);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("darkMode")) {
        if (e.matches) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }
      }
    });

  function toggleDarkMode() {
    if (document.body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  }

  function enableDarkMode() {
    document.body.classList.add("dark-mode");
    document.documentElement.setAttribute("data-theme", "dark");
    const icon = darkModeToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
    localStorage.setItem("darkMode", "enabled");

    const header = document.querySelector(".header");
    if (header && window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
    }
  }

  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    document.documentElement.removeAttribute("data-theme");
    const icon = darkModeToggle.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
    localStorage.setItem("darkMode", "disabled");

    const header = document.querySelector(".header");
    if (header && window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    }
  }

  initializeTheme();

  window.addEventListener("load", function () {
    const preloader = document.createElement("div");
    preloader.className = "preloader";
    preloader.innerHTML = `
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    `;
    document.body.prepend(preloader);

    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      setTimeout(() => preloader.remove(), 500);
    }, 500);
  });
});
