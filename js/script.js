console.log("JavaScript is working!");
let name = "Rushikesh";
let role = "Web Developer";

console.log(name);
console.log(role);
let button = document.getElementById("helloBtn");
let message = document.getElementById("message");

button.addEventListener("click", function () {
    message.textContent = "Hello Rushikesh 👋 Welcome to my portfolio!";
});