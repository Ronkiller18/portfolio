function analyze() {
    const input = document.getElementById("inputData").value;
    const results = document.getElementById("results");

    let findings = [];

    if (detectXSS(input)) {
        findings.push({
            type: "XSS",
            severity: "High",
            message: "Potential XSS payload detected"
        });
    }

    if (detectPhishing(input)) {
        findings.push({
            type: "Phishing",
            severity: "Medium",
            message: "Suspicious URL pattern detected"
        });
    }

    if (detectDOMRisk(input)) {
        findings.push({
            type: "DOM Risk",
            severity: "High",
            message: "Unsafe DOM manipulation detected"
        });
    }

    displayResults(findings);
}

function detectXSS(input) {
    const patterns = [
        /<script[\s\S]*?>[\s\S]*?<\/script>/i,

        // Only match event handlers inside HTML tags
        /<[^>]+on\w+\s*=/i,

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
            </div>
        `;
    });

    results.innerHTML = html;
}