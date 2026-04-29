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

function tryPayload() {
    const payload = '<img src=x onerror=alert("XSS")>';

    document.getElementById("userInput").value = payload;

    // Automatically trigger vulnerable function
    displayInput();
}

function copyPayload() {
    const payload = '<img src=x onerror=alert("XSS")>';

    navigator.clipboard.writeText(payload)
        .then(() => {
            document.getElementById("copyStatus").textContent = "Payload copied!";
        })
        .catch(() => {
            document.getElementById("copyStatus").textContent = "Copy failed";
        });
        setTimeout(() => {
            document.getElementById("copyStatus").textContent = "";
        }, 1500);
}

function displaySafeInput() {
    const input = document.getElementById("safeInput").value;
    const output = document.getElementById("safeOutput");

    // ✅ SECURE CODE
    output.textContent = input;
}

const quiz = [
    {
        url: "https://secure-paypal.com-login.xyz",
        isSafe: false
    },
    {
        url: "https://www.amazon.in",
        isSafe: true
    },
    {
        url: "https://google.verify-account-security.com",
        isSafe: false
    }
];

let current = 0;

function loadQuestion() {
    document.getElementById("question").textContent = quiz[current].url;
    document.getElementById("result").textContent = "";
}

function checkAnswer(userChoice) {
    const correct = quiz[current].isSafe;

    const result = document.getElementById("result");

    if (userChoice === correct) {
        result.textContent = "Correct!";
    } else {
        result.textContent = "Wrong! This was " + (correct ? "Safe" : "Phishing");
    }

    current = (current + 1) % quiz.length;

    setTimeout(loadQuestion, 1000);
}

// Load first question
loadQuestion();

function runComparison() {
    const input = document.getElementById("compareInput").value;

    // Vulnerable
    document.getElementById("compareVuln").innerHTML = input;

    // Secure
    document.getElementById("compareSafe").textContent = input;
}