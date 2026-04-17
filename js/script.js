console.log("JavaScript is working!");
const name = "Rushikesh";
let role = "Web Developer";

console.log(name);
console.log(role);
let button = document.getElementById("helloBtn");
let message = document.getElementById("message");

button.addEventListener("click", function () {
    message.textContent = "Hello " + name + " 👋";
});
let toggle = document.getElementById("darkModeToggle");

toggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggle.textContent = "☀️ Light Mode";
  } else {
    toggle.textContent = "🌙 Dark Mode";
  }
});