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

  const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));


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

      const card = btn.closest(".project-card");
      const details = card.querySelector(".project-details");

      if (!details) return;

      details.classList.toggle("show");

      btn.textContent = details.classList.contains("show")
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

  // ADD THIS ↓
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        nav.classList.add("nav-scrolled");
      }
      else {
        nav.classList.remove("nav-scrolled");
      }

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
    if (progressBar) {
    progressBar.style.width = scrollPercent + "%";
    }

    // ---------------------
    // ACTIVE SECTION
    // ---------------------
    let currentSection = "";

    // ---------------------
    // DETECT ACTIVE SECTION
    // ---------------------
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight;
      if (scrollTop >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    //------------------
    // Preview System
    //------------------

    // ===== DOM Elements =====
    const modal = document.getElementById("previewModal");
    const frame = document.getElementById("previewFrame");
    const closeBtn = document.querySelector(".preview-close");
    const overlay = document.querySelector(".preview-overlay");

    const loader = document.getElementById("previewLoader");
    const fallback = document.getElementById("previewFallback");
    const openLink = document.getElementById("openLiveLink");

    let fallbackTimeout;
    let isFrameLoaded = false;


    // ===== Open Modal =====
    document.querySelectorAll(".preview-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const url = btn.dataset.url;
        if (!url) return;

        isFrameLoaded = false;

        // Reset states
        frame.classList.remove("loaded");
        loader.classList.remove("hidden");
        fallback.classList.add("hidden");

        openLink.href = url;

        // Open modal first (better UX)
        modal.classList.add("active");
        document.body.classList.add("no-scroll");

        // Load content
        frame.src = url;

        // Handle fallback (timeout)
        clearTimeout(fallbackTimeout);

        fallbackTimeout = setTimeout(() => {
          if (isFrameLoaded) return;

          loader.classList.add("hidden");
          fallback.classList.remove("hidden");
        }, 3000);
      });
    });


    // ===== iframe Load Event (Attach ONCE) =====
    frame.addEventListener("load", () => {
      isFrameLoaded = true;

      loader.classList.add("hidden");
      frame.classList.add("loaded");
    });


    // ===== Close Modal =====
    function closeModal() {
      modal.classList.remove("active");
      frame.src = "";

      isFrameLoaded = false;
      clearTimeout(fallbackTimeout);

      loader.classList.remove("hidden");
      fallback.classList.add("hidden");

      document.body.classList.remove("no-scroll");
    }


    // ===== Close Events =====
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);


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