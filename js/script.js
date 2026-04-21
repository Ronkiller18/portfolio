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

  const progressBar = document.querySelector(".progress-bar");


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

  // SCROLL PROGRESS BAR
  let ticking = false;

    function updateProgressBar() {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

      const scrollPercent = (scrollTop / documentHeight) * 100;

      progressBar.style.width = scrollPercent + "%";
      ticking = false;
    }

      window.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(updateProgressBar);
          ticking = true;
        }
      });

  // ==========================
  // 6. ACTIVE SECTION TRACKER
  // ==========================

  function setActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight * 0.3) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);

});