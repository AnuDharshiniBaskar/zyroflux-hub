/* ZyrofluxHub – site behaviour */

// >>> Change this to your real email address <<<
const CONTACT_EMAIL = "hello@zyrofluxhub.example";

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

/* 3. "Register Now" buttons: jump to the contact form with a ready message */
document.querySelectorAll(".event-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const title = btn.closest(".event-card").querySelector("h3").textContent.trim();
        const message = document.getElementById("message");
        message.value = `Hi, I would like to register for the "${title}" workshop. Please share the details.`;
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => document.getElementById("name").focus({ preventScroll: true }), 600);
    });
});

/* 4. Contact form: opens the visitor's email app with the message filled in */
const form = document.getElementById("contactForm");
const status = document.createElement("p");
status.className = "form-status";
status.setAttribute("role", "status");
form.appendChild(status);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const subject = `Message from ${data.get("name")} – ZyrofluxHub website`;
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Opening your email app to send the message…";
    form.reset();
});
