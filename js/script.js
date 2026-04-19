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

  const reveals = document.querySelectorAll(".reveal");

  const nav = document.getElementById("navbar");
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section[id]");


  // =====================
  // 3. CONSTANTS
  // =====================
  const offset = nav ? nav.offsetHeight : 0;


  // =====================
  // 4. HELLO BUTTON
  // =====================
  if (button && message) {
    button.addEventListener("click", () => {
      message.textContent = `Hello ${name} 👋`;
    });
  }


  // =====================
  // 5. DARK MODE
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
  // 6. SCROLL REVEAL
  // =====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));


  // =====================
  // 7. ACTIVE NAVBAR
  // =====================
  const handleScroll = () => {
    let current = "";

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY - offset;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        current = section.getAttribute("id");
      }
    });

    // Special case for hero (top of page)
    if (window.scrollY < 50) {
      current = "hero";
    }

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);

});