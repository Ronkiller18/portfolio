document.addEventListener("DOMContentLoaded", () => {

  console.log("JavaScript is working!");

  // =====================
  // 1. VARIABLES
  // =====================
  const name = "Rushikesh";


  // =====================
  // 2. DOM ELEMENTS
  // =====================
  const button = document.getElementById("helloBtn");
  const message = document.getElementById("message");
  const toggle = document.getElementById("darkModeToggle");

  const detailButtons = document.querySelectorAll(".details-btn");
  const reveals = document.querySelectorAll(".reveal");

  const nav = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section[id]");


  // =====================
  // 3. BUTTONS
  // =====================

  // Hello Button
  if (button && message) {
    button.addEventListener("click", () => {
      message.textContent = `Hello ${name} 👋`;
    });
  }

  // Detail Buttons
  detailButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      const details = btn.nextElementSibling;
      if (!details) return;

      details.classList.toggle("hidden");

      btn.textContent = details.classList.contains("hidden")
        ? "View Details"
        : "Hide Details";
    });
  });


  // =====================
  // 4. DARK MODE
  // =====================
  if (toggle) {
    toggle.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      toggle.textContent = document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }


  // =====================
  // 5. SCROLL REVEAL
  // =====================
  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });

  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));


  // =====================
  // 6. ACTIVE NAVBAR
  // =====================
  const setActiveNav = () => {

    let currentSection = "";

    // Get navbar height once
    const navHeight = nav ? nav.offsetHeight : 0;

    sections.forEach(section => {

      const rect = section.getBoundingClientRect();

      // Check if section is at navbar position
      if (rect.top <= navHeight && rect.bottom >= navHeight) {
        currentSection = section.id;
      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {

        link.classList.add("active");

        // Scroll active link into view (mobile)
        link.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest"
        });
      }

    });
  };


  // =====================
  // 7. INIT & EVENTS
  // =====================

  // Run on scroll
  window.addEventListener("scroll", setActiveNav);

  // Run once on load
  setActiveNav();

});