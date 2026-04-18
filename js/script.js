document.addEventListener("DOMContentLoaded", () => {
console.log("JavaScript is working!");

// --------------------
// Variables
// --------------------
const name = "Rushikesh";
let role = "Web Developer";

console.log(name);
console.log(role);

// --------------------
// DOM Elements
// --------------------
const button = document.getElementById("helloBtn");
const message = document.getElementById("message");
const toggle = document.getElementById("darkModeToggle");
const reveals = document.querySelectorAll(".reveal");

// --------------------
// Hello Button
// --------------------
if (button && message) {
  button.addEventListener("click", () => {
    message.textContent = `Hello ${name} 👋`;
  });

  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      message.textContent = `Hello ${name} 👋`;
    }
  });
}

// --------------------
// Dark Mode Toggle
// --------------------
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    toggle.textContent = document.body.classList.contains("dark")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });
}

// --------------------
// Scroll Reveal
// --------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("active", entry.isIntersecting);
  });
}, {
  threshold: 0.1
});

reveals.forEach((section) => observer.observe(section));
});