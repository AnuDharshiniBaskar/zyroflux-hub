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
// PAYMENT_LINKS: paste a Razorpay (or similar) payment link per course; it is used instead of UPI when filled.
const UPI_ID = "";
const UPI_NAME = "ZyrofluxHub";
const PAYMENT_LINKS = {
    "Python Programming": "",
    "Web Development": "",
    "Artificial Intelligence": "",
    "Machine Learning": "",
    "Data Science": ""
};

// >>> COURSE DETAILS & PRICES – edit here. The key must match the course title on the page. <<<
// price: write "Free" or an amount such as "₹1,499". topics: what students will learn.
const COURSES = {
    "Python Programming": {
        price: "₹999",
        duration: "6 weeks",
        description: "Start from zero and learn to write real Python programs.",
        topics: [
            "Python basics: variables, data types, operators",
            "Conditions, loops and functions",
            "Lists, dictionaries and file handling",
            "Object-oriented programming",
            "Mini projects and practice tasks"
        ]
    },
    "Web Development": {
        price: "₹1,499",
        duration: "8 weeks",
        description: "Learn to design and build modern, responsive websites.",
        topics: [
            "HTML and CSS: layouts, colours, responsive design",
            "JavaScript fundamentals and DOM",
            "Building interactive web pages",
            "Git, GitHub and deploying a website",
            "Final project: your own website"
        ]
    },
    "Artificial Intelligence": {
        price: "₹1,999",
        duration: "8 weeks",
        description: "Understand how AI works and how to use it in real applications.",
        topics: [
            "What AI is and where it is used",
            "Search, logic and problem solving",
            "Introduction to neural networks",
            "Working with AI tools and APIs",
            "Mini project: build a simple AI application"
        ]
    },
    "Machine Learning": {
        price: "₹1,999",
        duration: "8 weeks",
        description: "Build and evaluate machine learning models using Python.",
        topics: [
            "Python, NumPy and Pandas for ML",
            "Supervised learning: regression and classification",
            "Unsupervised learning: clustering",
            "Model training, testing and evaluation",
            "Project: predict something from real data"
        ]
    },
    "Data Science": {
        price: "₹1,499",
        duration: "8 weeks",
        description: "Learn to collect, clean, analyse and present data.",
        topics: [
            "Data analysis with Python and Pandas",
            "Data cleaning and preparation",
            "Charts and visualisation",
            "Statistics basics",
            "Project: analyse a real dataset and present findings"
        ]
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

function handleRegister(title, kind) {
    const text = kind === "course"
        ? `Hi, I would like to enroll in the "${title}" course. Please share the details.`
        : `Hi, I would like to register for the "${title}" workshop. Please share the details.`;

    if (REGISTER_LINK) {
        window.open(REGISTER_LINK, "_blank", "noopener");
    } else if (WHATSAPP_NUMBER) {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    } else {
        setRegType((kind === "course" ? "Course Enrollment: " : "Workshop Registration: ") + title);
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => document.getElementById("name").focus({ preventScroll: true }), 600);
    }
}

const titleOf = (card) => card.querySelector("h3").textContent.trim();

document.querySelectorAll(".event-btn").forEach((btn) =>
    btn.addEventListener("click", () => handleRegister(titleOf(btn.closest(".event-card")), "workshop"))
);

/* Course cards: show the price from COURSES, and open the details pop-up */
const modal = document.getElementById("courseModal");
let modalTitle = "";
let lastFocus = null;

function openCourse(card) {
    modalTitle = titleOf(card);
    const info = COURSES[modalTitle];
    if (!info) { handleRegister(modalTitle, "course"); return; }
    modal.querySelector("[data-m-level]").textContent = card.querySelector(".course-level").textContent.trim();
    modal.querySelector("[data-m-title]").textContent = modalTitle;
    modal.querySelector("[data-m-desc]").textContent = info.description;
    modal.querySelector("[data-m-duration]").textContent = info.duration;
    modal.querySelector("[data-m-price]").textContent = info.price;
    const amount = parseInt(String(info.price).replace(/[^0-9]/g, ""), 10) || 0;
    modal.querySelector(".modal-pay").hidden = !amount;   // no Pay button for free courses
    modal.querySelector(".pay-panel").hidden = true;
    const list = modal.querySelector("[data-m-topics]");
    list.innerHTML = "";
    info.topics.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        list.appendChild(li);
    });
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
    const info = COURSES[titleOf(card)];
    if (info) card.querySelector(".course-price").textContent = info.price;
    card.querySelector(".course-info-btn").addEventListener("click", () => openCourse(card));
    card.querySelector(".course-btn").addEventListener("click", () => handleRegister(titleOf(card), "course"));
});

modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeCourse));
modal.querySelector(".modal-enroll").addEventListener("click", () => {
    closeCourse();
    handleRegister(modalTitle, "course");
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeCourse();
});

/* Pay Now: payment link, or UPI details, or a "contact us" note */
modal.querySelector(".modal-pay").addEventListener("click", () => {
    const info = COURSES[modalTitle];
    const amount = parseInt(String(info.price).replace(/[^0-9]/g, ""), 10) || 0;
    const link = PAYMENT_LINKS[modalTitle];
    if (link) { window.open(link, "_blank", "noopener"); return; }

    const panel = modal.querySelector(".pay-panel");
    const upiBox = panel.querySelector(".pay-upi");
    const note = panel.querySelector("[data-pay-note]");
    panel.querySelector("[data-pay-amount]").textContent = info.price;
    panel.hidden = false;

    if (UPI_ID) {
        upiBox.hidden = false;
        upiBox.querySelector("[data-pay-upi]").textContent = UPI_ID;
        upiBox.querySelector(".pay-open").href =
            `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}` +
            `&am=${amount}&cu=INR&tn=${encodeURIComponent(modalTitle + " course")}`;
        note.textContent = "After paying, send the payment screenshot to " + CONTACT_EMAIL + " so we can confirm your seat.";
    } else {
        upiBox.hidden = true;
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
const status = document.createElement("p");
status.className = "form-status";
status.setAttribute("role", "status");
form.appendChild(status);

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
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
        const body = `Interested in: ${interest}\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}`;
        window.location.href =
            `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        status.textContent = "Opening your email app to send your details…";
        form.reset();
    } finally {
        submitBtn.disabled = false;
    }
});
