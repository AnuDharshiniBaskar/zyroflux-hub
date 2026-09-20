/* ZyrofluxHub – site behaviour */

// >>> Change these two lines to your real details. They update the whole site. <<<
const CONTACT_EMAIL = "zyrofluxhub@gmail.com";
// >>> To receive every registration in your Gmail (works on ANY hosting):
// get a free Access Key at web3forms.com and paste it between the quotes. <<<
const WEB3FORMS_KEY = "";
const INSTAGRAM_ID = "zyroflux_hub"; // without the @

document.querySelectorAll("[data-email]").forEach((a) => (a.href = "mailto:" + CONTACT_EMAIL));
document.querySelectorAll("[data-email-text]").forEach((el) => (el.textContent = CONTACT_EMAIL));
document.querySelectorAll("[data-instagram]").forEach((a) => (a.href = "https://instagram.com/" + INSTAGRAM_ID));
document.querySelectorAll("[data-instagram-text]").forEach((el) => (el.textContent = "@" + INSTAGRAM_ID));

// >>> PAYMENT SETTINGS – edit here <<<
// UPI_ID: your UPI ID, e.g. "yourname@okhdfcbank". Leave "" until you have it.
// PAYMENT_LINKS: optional payment link for the FULL course (used only when all modules are selected).
const UPI_ID = "";
const UPI_NAME = "ZyrofluxHub";
const PAYMENT_LINKS = {
    "Machine Learning": "",
    "Deep Learning": "",
    "NLP": "",
    "Flask": "",
    "Python": "",
    "Data Science": "",
    "Data Analytics": "",
    "Web Development": ""
};

// >>> FEES – edit here <<<
const MODULE_PRICE = 200;   // one module
const COURSE_PRICE = 1000;  // full course (all 5 modules)
const rupees = (n) => "₹" + n.toLocaleString("en-IN");

// >>> COURSES – the key must match the course title on the page <<<
const COURSES = {
    "Machine Learning": {
        description: "Build and evaluate machine learning models from scratch.",
        modules: ["ML Fundamentals", "Data Preprocessing", "Supervised Learning", "Unsupervised Learning", "Model Evaluation & Project"]
    },
    "Deep Learning": {
        description: "Understand neural networks and build deep learning models.",
        modules: ["Deep Learning Fundamentals", "ANN & Model Training", "CNN", "RNN, LSTM & GRU", "TensorFlow/Keras & Project"]
    },
    "NLP": {
        description: "Teach machines to read, understand and work with human language.",
        modules: ["NLP Fundamentals", "Text Processing", "Text Representation", "NLP Applications", "Modern NLP & Project"]
    },
    "Flask": {
        description: "Build web apps and APIs in Python, and deploy them.",
        modules: ["Flask Fundamentals", "Templates & Forms", "Database Integration", "APIs & ML Integration", "Deployment & Project"]
    },
    "Python": {
        description: "Start from zero and learn to write real Python programs.",
        modules: ["Python Fundamentals", "Control Flow & Functions", "Python Data Structures", "Advanced Python", "Python for Data & Project"]
    },
    "Data Science": {
        description: "Learn to prepare, explore, visualise and model data.",
        modules: ["Data Science Fundamentals", "Data Preparation", "Exploratory Data Analysis", "Visualization & ML", "Evaluation & Project"]
    },
    "Data Analytics": {
        description: "Turn raw data into insights with Excel, SQL and Power BI.",
        modules: ["Analytics Fundamentals", "Excel for Analytics", "SQL for Analytics", "Power BI", "Dashboard & Project"]
    },
    "Web Development": {
        description: "Learn to design and build modern, full-stack websites.",
        modules: ["HTML5", "CSS3", "JavaScript", "React.js", "Backend & Full Stack Project"]
    }
};

document.documentElement.classList.add("js");

/* 1. Scroll reveal */
const revealTargets = document.querySelectorAll(
    ".section-heading, .card, .event-card, .course-card, .webinar-box, .about-content, .contact-box"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    revealTargets.forEach((el) => io.observe(el));
} else {
    revealTargets.forEach((el) => el.classList.add("visible"));
}

/* 2. Highlight the nav link of the section currently on screen */
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = [...navLinks]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

function updateActiveLink() {
    const y = window.scrollY + 120;
    let current = sections[0];
    sections.forEach((s) => {
        if (s.offsetTop <= y) current = s;
    });
    navLinks.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + current.id)
    );
}
window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

/* 3. "Register Now" / "Enroll Now" buttons
      - If REGISTER_LINK is set, it opens your registration form.
      - Else if WHATSAPP_NUMBER is set, it opens WhatsApp with the name filled in.
      - Otherwise it jumps to the contact form below with a ready message. */
const REGISTER_LINK = "";   // e.g. "https://forms.gle/abc123"
const WHATSAPP_NUMBER = ""; // country code + number, no + or spaces, e.g. "919876543210"

// Remembers what the visitor clicked (course, workshop...) and sends it with the form
function setRegType(value) {
    const field = document.getElementById("interest");
    if (field) field.value = value;
}

function handleRegister(title, kind, detail = "") {
    const label = detail ? `${title} (${detail})` : title;
    const text = kind === "course"
        ? `Hi, I would like to enroll in the "${label}" course. Please share the details.`
        : `Hi, I would like to register for the "${label}" workshop. Please share the details.`;

    if (REGISTER_LINK) {
        window.open(REGISTER_LINK, "_blank", "noopener");
    } else if (WHATSAPP_NUMBER) {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
        setRegType((kind === "course" ? "Course Enrollment: " : "Workshop Registration: ") + label);
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => document.getElementById("name").focus({ preventScroll: true }), 600);
    }
}

const titleOf = (card) => card.querySelector("h3").textContent.trim();

document.querySelectorAll(".event-btn").forEach((btn) =>
    btn.addEventListener("click", () => handleRegister(titleOf(btn.closest(".event-card")), "workshop"))
);

/* Course cards + details pop-up with module picker */
const modal = document.getElementById("courseModal");
let modalTitle = "";
let lastFocus = null;
let selected = new Set();

const selectedTotal = (info) => selected.size === info.modules.length ? COURSE_PRICE : selected.size * MODULE_PRICE;

function selectionText(info) {
    const n = selected.size;
    if (n === info.modules.length) return `Full course – ${rupees(COURSE_PRICE)}`;
    const nums = [...selected].sort((a, b) => a - b).map((i) => i + 1).join(", ");
    return `Module${n > 1 ? "s" : ""} ${nums} – ${rupees(n * MODULE_PRICE)}`;
}

function updateTotal() {
    const info = COURSES[modalTitle];
    const n = selected.size;
    modal.querySelector("[data-m-selected]").textContent =
        n === info.modules.length ? `Full course (all ${n} modules)` : `${n} of ${info.modules.length} modules selected`;
    modal.querySelector("[data-m-total]").textContent = rupees(selectedTotal(info));
    modal.querySelector(".modal-pay").disabled = n === 0;
    modal.querySelector(".modal-enroll").disabled = n === 0;
    modal.querySelector(".pay-panel").hidden = true;
}

function openCourse(card) {
    modalTitle = titleOf(card);
    const info = COURSES[modalTitle];
    if (!info) { handleRegister(modalTitle, "course"); return; }
    modal.querySelector("[data-m-level]").textContent = card.querySelector(".course-level").textContent.trim();
    modal.querySelector("[data-m-title]").textContent = modalTitle;
    modal.querySelector("[data-m-desc]").textContent = info.description;
    modal.querySelector("[data-m-full]").textContent = rupees(COURSE_PRICE);
    modal.querySelector("[data-m-permod]").textContent = rupees(MODULE_PRICE);

    const list = modal.querySelector("[data-m-modules]");
    list.innerHTML = "";
    selected = new Set(info.modules.map((_, i) => i));   // full course selected by default
    info.modules.forEach((name, i) => {
        const li = document.createElement("li");
        li.className = "mod-item";
        const label = document.createElement("label");
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = true;
        cb.addEventListener("change", () => {
            if (cb.checked) selected.add(i); else selected.delete(i);
            updateTotal();
        });
        const text = document.createElement("span");
        text.textContent = `Module ${i + 1} – ${name}`;
        const price = document.createElement("b");
        price.textContent = rupees(MODULE_PRICE);
        label.append(cb, text, price);
        li.appendChild(label);
        list.appendChild(li);
    });
    updateTotal();

    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
}

function closeCourse() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus) lastFocus.focus();
}

document.querySelectorAll(".course-card").forEach((card) => {
    card.querySelector(".course-info-btn").addEventListener("click", () => openCourse(card));
    card.querySelector(".course-btn").addEventListener("click", () =>
        handleRegister(titleOf(card), "course", `Full course – ${rupees(COURSE_PRICE)}`)
    );
});

modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeCourse));
modal.querySelector(".modal-enroll").addEventListener("click", () => {
    const info = COURSES[modalTitle];
    const detail = selectionText(info);
    closeCourse();
    handleRegister(modalTitle, "course", detail);
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeCourse();
});

/* Pay Now: shows the UPI ID and buttons for GPay, PhonePe, Paytm and other UPI apps
   (plus a card / net banking link when PAYMENT_LINKS is filled for the full course) */
modal.querySelector(".modal-pay").addEventListener("click", () => {
    const info = COURSES[modalTitle];
    const total = selectedTotal(info);
    const full = selected.size === info.modules.length;
    const link = full ? PAYMENT_LINKS[modalTitle] : "";

    const panel = modal.querySelector(".pay-panel");
    const upiBox = panel.querySelector(".pay-upi");
    const linkBtn = panel.querySelector("[data-pay-link]");
    const note = panel.querySelector("[data-pay-note]");
    panel.querySelector("[data-pay-amount]").textContent = rupees(total);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });

    linkBtn.hidden = !link;
    if (link) linkBtn.href = link;

    upiBox.hidden = !UPI_ID;
    if (UPI_ID) {
        upiBox.querySelector("[data-pay-upi]").textContent = UPI_ID;
        const q = `pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR` +
                  `&tn=${encodeURIComponent(modalTitle + (full ? " full course" : " " + selected.size + " modules"))}`;
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const links = {
            gpay: (isIOS ? "gpay://upi/pay?" : "tez://upi/pay?") + q,
            phonepe: "phonepe://pay?" + q,
            paytm: "paytmmp://pay?" + q,
            upi: "upi://pay?" + q
        };
        upiBox.querySelectorAll(".pay-app").forEach((a) => (a.href = links[a.dataset.app]));
        note.textContent = `After paying, send the payment screenshot to ${CONTACT_EMAIL} and mention: ${modalTitle} – ${selectionText(info)}.`;
    } else if (link) {
        note.textContent = "Pay securely online using the button above, then send the receipt to " + CONTACT_EMAIL + ".";
    } else {
        note.textContent = "Online payment is not set up yet. Please contact us at " + CONTACT_EMAIL + " to pay and confirm your seat.";
    }
});
modal.querySelector(".pay-copy").addEventListener("click", (e) => {
    if (navigator.clipboard) navigator.clipboard.writeText(UPI_ID).then(() => (e.target.textContent = "Copied"));
});

/* 3c. Other buttons that lead to the form also pick the right registration type */
document.querySelectorAll("#webinars .primary-btn").forEach((a) =>
    a.addEventListener("click", () => setRegType("Webinar Registration"))
);
document.querySelectorAll("#projects .card a").forEach((a) =>
    a.addEventListener("click", () => setRegType("Project Development Enquiry"))
);

/* 4. Contact form
      On Netlify the details are saved in your Netlify dashboard (Forms tab).
      If that is not available (for example when testing on your computer),
      it falls back to opening the visitor's email app. */
const form = document.getElementById("contactForm");

// Department: "Others" shows a box to type your own department
const deptSelect = document.getElementById("department");
const deptOtherBox = document.getElementById("deptOtherBox");
const deptOther = document.getElementById("deptOther");
deptSelect.addEventListener("change", () => {
    const isOther = deptSelect.value === "Others";
    deptOtherBox.hidden = !isOther;
    deptOther.required = isOther;
    if (isOther) deptOther.focus();
});
const status = document.createElement("p");
status.className = "form-status";
status.setAttribute("role", "status");
form.appendChild(status);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (data.get("department") === "Others") {
        data.set("department", (data.get("department_other") || "").trim() || "Others");
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    status.textContent = "Submitting…";
    try {
        const interest = data.get("interest") || "General Enquiry";
        if (WEB3FORMS_KEY) {
            // Emails the details straight to your inbox (works on any host)
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `${interest} – ${data.get("name")} (ZyrofluxHub website)`,
                    from_name: "ZyrofluxHub Website",
                    name: data.get("name"),
                    email: data.get("email"),
                    phone: data.get("phone"),
                    college: data.get("college"),
                    department: data.get("department"),
                    interest: interest,
                    botcheck: ""
                })
            });
            const result = await res.json();
            if (!result.success) throw new Error("Not sent");
        } else {
            // Netlify Forms (only works if the site is hosted on Netlify)
            const res = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(data).toString()
            });
            if (!res.ok) throw new Error("Form not saved");
        }
        status.textContent = "Thank you! Your details are submitted. We will contact you soon.";
        form.reset();
    } catch (err) {
        const interest = data.get("interest") || "General Enquiry";
        const subject = `${interest} – ${data.get("name")} (ZyrofluxHub website)`;
        const body = `Interested in: ${interest}\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nCollege: ${data.get("college")}\nDepartment: ${data.get("department")}`;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.textContent = "Opening your email app to send your details…";
        form.reset();
    } finally {
        submitBtn.disabled = false;
    }
});

/* 5. Mobile menu (hamburger) */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

function setMenu(open) {
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
navToggle.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
navMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", (e) => { if (!e.target.closest(".navbar")) setMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 900) setMenu(false); });

/* 6. Light / dark theme switch (remembers the choice) */
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
