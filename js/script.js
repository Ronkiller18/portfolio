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

  const interactiveElements = document.querySelectorAll("button, .cta-btn, .details-btn");

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

// CLICK FEEDBACK (Optional)
interactiveElements.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.add("clicked");

    setTimeout(() => {
      el.classList.remove("clicked");
    }, 120);
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
  // SCROLL ENGINE (UNIFIED)
  // =====================

  let ticking = false;

  function updateOnScroll() {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    // ---------------------
    // PROGRESS BAR
    // ---------------------
    const scrollPercent = (scrollTop / documentHeight) * 100;
    progressBar.style.width = scrollPercent + "%";

    // ---------------------
    // ACTIVE SECTION
    // ---------------------
    let currentSection = "";

// ---------------------
// DETECT ACTIVE SECTION
// ---------------------
sections.forEach((section) => {
  const sectionTop = section.offsetTop - 120; // adjust for navbar height

  if (scrollTop >= sectionTop) {
    currentSection = section.getAttribute("id");
  }
});

// ---------------------
// FIX: BOTTOM EDGE CASE (OUTSIDE LOOP)
// ---------------------
if ((window.innerHeight + scrollTop) >= document.body.offsetHeight - 5) {
  currentSection = sections[sections.length - 1].getAttribute("id");
}

// ---------------------
// FIX: FALLBACK (IMPORTANT)
// ---------------------
if (!currentSection && sections.length > 0) {
  currentSection = sections[0].getAttribute("id");
}
    // ---------------------
    // NAV LINKS
    // ---------------------
    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    // ---------------------
    // SECTION FOCUS (Day 19)
    // ---------------------
    sections.forEach((section) => {
      section.classList.remove("active-section");

      if (section.getAttribute("id") === currentSection) {
        section.classList.add("active-section");
      }
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });

  // Initial state fix
  window.addEventListener("load", updateOnScroll);

});