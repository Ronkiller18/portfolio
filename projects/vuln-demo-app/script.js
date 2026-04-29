const buttons = document.querySelectorAll("nav button");
const tabs = document.querySelectorAll(".tab");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const target = button.dataset.tab;

        tabs.forEach(tab => {
            tab.classList.remove("active");
        });

        document.getElementById(target).classList.add("active");
    });
});

function displayInput() {
    const input = document.getElementById("userInput").value;
    const output = document.getElementById("output");

    // ❌ VULNERABLE CODE
    output.innerHTML = input;
}