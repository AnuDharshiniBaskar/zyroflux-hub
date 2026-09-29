/* PSR Engineering College verification page — ZyrofluxHub */

// Keep these two lines in sync with the same constants in script.js
const CONTACT_EMAIL = "zyrofluxhub@gmail.com";
const WEB3FORMS_KEY = "";   // paste your web3forms.com Access Key here to enable email + file delivery

/* 1. Theme toggle (matches the main site, and shares its saved choice) */
const themeToggle = document.getElementById("themeToggle");
const currentTheme = () => document.documentElement.getAttribute("data-theme") || "dark";
function setTheme(theme, save) {
    document.documentElement.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#000000" : "#f5f8ff");
    if (save) { try { localStorage.setItem("zh-theme", theme); } catch (e) {} }
}
setTheme(currentTheme(), false);
themeToggle.addEventListener("click", () => setTheme(currentTheme() === "dark" ? "light" : "dark", true));

/* 2. Prefill name / email / phone / interest carried over from the registration form */
const params = new URLSearchParams(window.location.search);
if (params.get("name")) document.getElementById("pName").value = params.get("name");
if (params.get("email")) document.getElementById("pEmail").value = params.get("email");
if (params.get("phone")) document.getElementById("pPhone").value = params.get("phone");
const interest = params.get("interest");
if (interest) {
    document.getElementById("hiddenInterest").value = interest;
    const summary = document.getElementById("interestSummary");
    summary.textContent = "You're registering for: " + interest;
    summary.hidden = false;
}

/* 3. Department: "Others" reveals a box to type your own department */
const deptSelect = document.getElementById("pDepartment");
const deptOtherBox = document.getElementById("deptOtherBox");
const deptOther = document.getElementById("deptOther");
deptSelect.addEventListener("change", () => {
    const isOther = deptSelect.value === "Others";
    deptOtherBox.hidden = !isOther;
    deptOther.required = isOther;
    if (isOther) deptOther.focus();
});

/* 4. Submit: sends the details AND the ID-card photo to zyrofluxhub@gmail.com */
const form = document.getElementById("psrForm");
const verifyCard = document.getElementById("verifyCard");
const verifyThanks = document.getElementById("verifyThanks");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get("department") === "Others") {
        data.set("department", (data.get("department_other") || "").trim() || "Others");
    }
    const interestVal = data.get("interest") || "PSR Engineering College verification";
    const subject = `PSR Verification – ${data.get("name")} (ZyrofluxHub website)`;
    const hasIdCard = data.get("id_card") instanceof File && data.get("id_card").size > 0;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    try {
        if (WEB3FORMS_KEY) {
            data.append("access_key", WEB3FORMS_KEY);
            data.append("subject", subject);
            data.append("from_name", "ZyrofluxHub Website — PSR Verification");
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data   // multipart/form-data — attaches the ID card photo itself
            });
            const result = await res.json();
            if (!result.success) throw new Error("Not sent");
        } else {
            const res = await fetch("/", { method: "POST", body: data });
            if (!res.ok) throw new Error("Form not saved");
        }
        form.hidden = true;
        verifyThanks.hidden = false;
    } catch (err) {
        const body =
            `Interested in: ${interestVal}\n` +
            `Name: ${data.get("name")}\nRoll Number: ${data.get("roll_no")}\nCollege: ${data.get("college")}\n` +
            `Department: ${data.get("department")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}` +
            (hasIdCard ? "\n(Please attach your College ID card photo to this email manually — your email app cannot attach it automatically.)" : "");
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Verification & Registration";
        alert("Opening your email app to send your details" + (hasIdCard ? " — please attach your ID card photo there too." : "."));
    }
});
