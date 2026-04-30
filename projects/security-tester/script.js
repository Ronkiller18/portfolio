let history = [];
let lastFindings = [];

function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function analyze() {
    const input = document.getElementById("inputData").value;
    const results = document.getElementById("results");

    let findings = [];

    if (detectXSS(input)) {
        findings.push({
            type: "XSS",
            severity: "High",
            confidence: 80,
            message: "Potential XSS payload detected"
        });
    }

    if (detectPhishing(input)) {
        findings.push({
            type: "Phishing",
            severity: "Medium",
            confidence: 60,
            message: "Suspicious URL pattern detected"
        });
    }

    if (detectDOMRisk(input)) {
        findings.push({
            type: "DOM Risk",
            severity: "High",
            confidence: 85,
            message: "Unsafe DOM manipulation detected"
        });
    }

    lastFindings = findings;
    history.push(input);

    displayResults(findings);
    updateHistory();
}

function detectXSS(input) {
    const patterns = [
        /<script[\s\S]*?>[\s\S]*?<\/script>/i,
        /<[^>]+on\w+\s*=/i,
        /onerror\s*=/i,
        /javascript\s*:/i,
        /<img[\s\S]*?>/i,
        /<svg[\s\S]*?>/i
    ];

    return patterns.some(pattern => pattern.test(input));
}

function detectPhishing(input) {
    const patterns = [
        /login/i,
        /verify/i,
        /secure/i,
        /account/i,
        /update/i
    ];

    const suspiciousDomain = /\.(xyz|tk|ml|ga|cf)/i;

    let score = 0;

    patterns.forEach(pattern => {
        if (pattern.test(input)) {
            score++;
        }
    });

    if (suspiciousDomain.test(input)) {
        score++;
    }

    return score >= 2;
}

function detectDOMRisk(input) {
    const patterns = [
        /innerHTML\s*=/i,
        /outerHTML\s*=/i,
        /document\.write\s*\(/i,
        /insertAdjacentHTML\s*\(/i,
        /eval\s*\(/i
    ];

    return patterns.some(pattern => pattern.test(input));
}

function getPayloadSuggestions(type) {
    if (type === "XSS") {
        return [
            "<script>alert(1)</script>",
            "<img src=x onerror=alert(1)>",
            "<svg onload=alert(1)>"
        ];
    }

    return [];
}

function displayResults(findings) {
    const results = document.getElementById("results");

    if (findings.length === 0) {
        results.innerHTML = "<p class='safe'>✅ No obvious security issues</p>";
        return;
    }

    let html = "";

    findings.forEach(f => {
        html += `
            <div class="result ${f.severity.toLowerCase()}">
                <strong>${f.type}</strong> (${f.severity})<br>
                ${f.message}
                <small>Confidence: ${f.confidence}%</small>
            
        `;
        const payloads = getPayloadSuggestions(f.type);

        if (payloads.length > 0) {
            html += "<ul>";
            payloads.forEach(p => {
                html += `<li>${escapeHTML(p)}</li>`;
            });
            html += "</ul>";
        }
        html += `</div>`;
    });

    results.innerHTML = html;
}
function updateHistory() {
    const list = document.getElementById("history");

    list.innerHTML = "";

    history.slice(-5).forEach(item => {
        list.innerHTML += `<li>${escapeHTML(item)}</li>`;
    });
}

function exportResults() {
    const data = JSON.stringify(lastFindings, null, 2);

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "scan-results.json";
    a.click();
}