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
// PAYMENT_LINKS: optional payment link per course for the FULL course ("student" = school/college rate, "others" = ₹300 rate).
const UPI_ID = "nikithamurugan2525@oksbi";
const UPI_NAME = "Nikitha Murugan";
const PAYMENT_LINKS = {
    "Machine Learning": { student: "", others: "" },
    "Deep Learning": { student: "", others: "" },
    "NLP": { student: "", others: "" },
    "Flask": { student: "", others: "" },
    "Python": { student: "", others: "" },
    "Data Science": { student: "", others: "" },
    "Data Analytics": { student: "", others: "" },
    "Web Development": { student: "", others: "" }
};

// >>> FEES – edit here <<<
// Per-module fee, and a flat full-course fee that applies to everyone.
const RATE = { "PSR Engineering College": 200, "Other College": 300 };
const COURSE_PRICE = 1000;   // flat price for the FULL course (all 5 modules), for any college
const rupees = (n) => "₹" + n.toLocaleString("en-IN");

// >>> COURSES – the key must match the course title on the page <<<
const COURSES = {
    "Machine Learning": {
        description: "Build and evaluate machine learning models from scratch.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Machine Learning.",
        modules: [
            { name: "ML Fundamentals", topics: ["Introduction to Machine Learning", "Types of ML: Supervised, Unsupervised and Reinforcement Learning", "ML applications and workflow", "Python environment and ML libraries", "Dataset understanding and problem definition"] },
            { name: "Data Preprocessing", topics: ["Data collection and loading", "Data cleaning and missing-value handling", "Categorical data encoding", "Feature selection and feature engineering", "Feature scaling and train-test split"] },
            { name: "Supervised Learning", topics: ["Linear Regression", "Logistic Regression", "K-Nearest Neighbors (KNN)", "Decision Tree and Random Forest", "Support Vector Machine (SVM)"] },
            { name: "Unsupervised Learning", topics: ["K-Means Clustering", "Hierarchical Clustering", "Dimensionality Reduction with PCA", "Cluster analysis and interpretation", "Practical implementation using real datasets"] },
            { name: "Model Evaluation & Project", topics: ["Confusion Matrix", "Accuracy, Precision, Recall and F1-Score", "Cross-validation and hyperparameter tuning", "Model saving and loading", "End-to-End Machine Learning Project"] },
        ]
    },
    "Deep Learning": {
        description: "Understand neural networks and build deep learning models.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Deep Learning.",
        modules: [
            { name: "Deep Learning Fundamentals", topics: ["Introduction to Deep Learning", "Artificial Neural Networks", "Perceptron and neurons", "Activation functions", "Loss functions and learning concepts"] },
            { name: "ANN & Training", topics: ["Artificial Neural Network architecture", "Forward propagation", "Backpropagation", "Optimizers: SGD, Adam", "Batch size, epochs and learning rate"] },
            { name: "Convolutional Neural Networks", topics: ["CNN architecture", "Convolution and filters", "Pooling layers", "Image classification", "Data augmentation"] },
            { name: "Sequence Models", topics: ["Sequence data fundamentals", "RNN architecture", "LSTM and GRU", "Text and time-series applications", "Practical sequence-model implementation"] },
            { name: "TensorFlow/Keras & Project", topics: ["TensorFlow and Keras workflow", "Model training and evaluation", "Overfitting and regularization", "Transfer learning introduction", "End-to-End Deep Learning Project"] },
        ]
    },
    "Web Development": {
        description: "Learn to design and build modern, full-stack websites.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Web Development.",
        modules: [
            { name: "HTML5", topics: ["Web fundamentals", "HTML document structure", "Headings, links, images and multimedia", "Tables and forms", "Semantic HTML"] },
            { name: "CSS3", topics: ["CSS selectors and properties", "Box model", "Positioning", "Flexbox and Grid", "Responsive web design"] },
            { name: "JavaScript", topics: ["JavaScript fundamentals", "Variables, data types and functions", "Arrays and objects", "DOM manipulation", "Events and modern ES6 features"] },
            { name: "React.js", topics: ["React and Vite setup", "Components and JSX", "Props and state", "Hooks", "API integration and frontend project structure"] },
            { name: "Backend & Full Stack", topics: ["Node.js and Express basics", "REST APIs", "MongoDB fundamentals", "Frontend-backend integration", "Authentication concepts and Full-Stack Project"] },
        ]
    },
    "NLP": {
        description: "Teach machines to read, understand and work with human language.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Natural Language Processing (NLP).",
        modules: [
            { name: "NLP Fundamentals", topics: ["Introduction to NLP", "Real-world NLP applications", "Text collection and preprocessing", "Tokenization", "Text normalization"] },
            { name: "Text Processing", topics: ["Stop-word removal", "Stemming and Lemmatization", "Part-of-Speech tagging", "N-grams", "Basic text feature extraction"] },
            { name: "Text Representation", topics: ["Bag of Words", "TF-IDF", "Word embeddings", "Word2Vec fundamentals", "Feature representation for ML models"] },
            { name: "NLP Applications", topics: ["Text classification", "Sentiment analysis", "Named Entity Recognition", "Text similarity", "Practical NLP model development"] },
            { name: "Modern NLP & Project", topics: ["Transformers introduction", "BERT fundamentals", "Model evaluation", "NLP pipeline development", "End-to-End NLP Project"] },
        ]
    },
    "Data Science": {
        description: "Learn to prepare, explore, visualise and model data.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Data Science.",
        modules: [
            { name: "Data Science Fundamentals", topics: ["Introduction to Data Science", "Data Science lifecycle", "Problem definition", "Python environment", "NumPy and Pandas fundamentals"] },
            { name: "Data Preparation", topics: ["Data collection", "Data cleaning", "Missing-value treatment", "Outlier detection", "Encoding and data transformation"] },
            { name: "Exploratory Data Analysis", topics: ["Descriptive statistics", "Univariate and bivariate analysis", "Correlation analysis", "Feature engineering", "EDA using real datasets"] },
            { name: "Visualization & ML", topics: ["Matplotlib", "Seaborn", "Effective data visualization", "Machine Learning fundamentals", "Model training basics"] },
            { name: "Evaluation & Project", topics: ["Model evaluation", "Model interpretation", "Data storytelling and reporting", "End-to-End Data Science workflow", "Complete Data Science Project"] },
        ]
    },
    "Flask": {
        description: "Build web apps and APIs in Python, and deploy them.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Flask Web Development.",
        modules: [
            { name: "Flask Fundamentals", topics: ["Introduction to Flask", "Installation and environment setup", "Flask project structure", "Routing and URL handling", "HTTP methods"] },
            { name: "Templates & Forms", topics: ["HTML templates", "Jinja2 templating", "Static files", "GET and POST forms", "Form data handling"] },
            { name: "Database Integration", topics: ["Database fundamentals", "SQLite/MySQL integration", "MongoDB integration basics", "CRUD operations", "Database-driven Flask application"] },
            { name: "APIs & ML Integration", topics: ["REST API fundamentals", "JSON requests and responses", "File and image upload", "Flask with machine learning models", "Authentication basics"] },
            { name: "Deployment & Project", topics: ["Error handling", "Security basics", "Configuration management", "Deployment concepts", "Complete Flask Application Project"] },
        ]
    },
    "Data Analytics": {
        description: "Turn raw data into insights with Excel, SQL and Power BI.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Data Analytics.",
        modules: [
            { name: "Analytics Fundamentals", topics: ["Introduction to Data Analytics", "Types of analytics", "Analytics workflow", "Data sources and collection", "Data cleaning fundamentals"] },
            { name: "Excel for Analytics", topics: ["Excel formulas and functions", "Sorting and filtering", "Conditional functions", "Pivot Tables", "Charts and basic dashboards"] },
            { name: "SQL for Analytics", topics: ["SQL fundamentals", "SELECT, WHERE and ORDER BY", "GROUP BY and aggregate functions", "JOIN operations", "Subqueries and practical queries"] },
            { name: "Power BI", topics: ["Power BI introduction", "Data import and Power Query", "Data modeling", "DAX fundamentals", "Interactive visualizations"] },
            { name: "Dashboard & Project", topics: ["Dashboard design", "Business KPIs", "Data interpretation", "Insight generation and reporting", "Real-Time Analytics Project"] },
        ]
    },
    "Python": {
        description: "Start from zero and learn to write real Python programs.",
        outcome: "structured theoretical knowledge, practical skills, and hands-on project experience in Python Programming.",
        modules: [
            { name: "Python Fundamentals", topics: ["Introduction to Python", "Installation and IDE setup", "Variables and data types", "Operators", "Input and output"] },
            { name: "Control Flow & Functions", topics: ["if/elif/else", "for and while loops", "break and continue", "Functions and arguments", "Lambda functions, modules and packages"] },
            { name: "Python Data Structures", topics: ["Strings", "Lists and tuples", "Sets", "Dictionaries", "Comprehensions and practical exercises"] },
            { name: "Advanced Python", topics: ["Object-Oriented Programming", "Classes and objects", "Inheritance and polymorphism", "Exception handling", "File handling and regular expressions"] },
            { name: "Python for Data & Project", topics: ["NumPy fundamentals", "Pandas fundamentals", "Matplotlib visualization", "Data processing workflow", "Complete Python Project"] },
        ]
    },
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
        regSyncFromInterest();
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => document.getElementById("name").focus({ preventScroll: true }), 600);
    }
}

const titleOf = (card) => card.querySelector("h3").textContent.trim();

document.querySelectorAll(".event-btn").forEach((btn) =>
    btn.addEventListener("click", () => handleRegister(titleOf(btn.closest(".event-card")), "workshop"))
);


/* React component: one module row with its checkbox, price and an
   expandable list of the topics covered (from the official syllabus). */
function ModuleRow({ index, mod, price, checked, onToggle }) {
    const [open, setOpen] = React.useState(false);
    return React.createElement(
        "li",
        { className: "mod-item" },
        React.createElement(
            "div",
            { className: "mod-row" },
            React.createElement(
                "label",
                null,
                React.createElement("input", {
                    type: "checkbox",
                    checked,
                    onChange: () => onToggle(index)
                }),
                React.createElement("span", null, `Module ${index + 1} – ${mod.name}`),
                React.createElement("b", null, price)
            ),
            React.createElement(
                "button",
                { type: "button", className: "mod-toggle", onClick: () => setOpen((o) => !o), "aria-expanded": open },
                open ? "Hide topics ▲" : "Show topics ▼"
            )
        ),
        open &&
            React.createElement(
                "ul",
                { className: "mod-topics" },
                mod.topics.map((t, i) => React.createElement("li", { key: i }, t))
            )
    );
}

// Renders the syllabus (React) into any <ul> container, e.g. the pop-up or the registration form.
function renderModuleList(container, info, rate, selectedSet, onChange) {
    const rows = info.modules.map((mod, i) =>
        React.createElement(ModuleRow, {
            key: i,
            index: i,
            mod,
            price: rupees(rate()),
            checked: selectedSet.has(i),
            onToggle: (i) => {
                if (selectedSet.has(i)) selectedSet.delete(i); else selectedSet.add(i);
                onChange();
            }
        })
    );
    ReactDOM.render(React.createElement(React.Fragment, null, rows), container);
}

/* Course cards + details pop-up (choose who is joining + modules) */
const modal = document.getElementById("courseModal");
const audienceSelect = document.getElementById("audience");   // the "Registering as" field in the form
let modalTitle = "";
let lastFocus = null;
let selected = new Set();
let audience = RATE[audienceSelect.value] ? audienceSelect.value : "PSR Engineering College";  // falls back if an old value is stored

const moduleRate = () => RATE[audience];
const fullPrice = () => COURSE_PRICE;   // full course is always ₹1,000, for every college
const selectedTotal = (info) => (selected.size === info.modules.length ? COURSE_PRICE : selected.size * moduleRate());

function selectionText(info) {
    const n = selected.size;
    if (n === info.modules.length) return `Full course – ${rupees(fullPrice())}`;
    const nums = [...selected].sort((a, b) => a - b).map((i) => i + 1).join(", ");
    return `Module${n > 1 ? "s" : ""} ${nums} – ${rupees(selectedTotal(info))}`;
}

function refreshPrices() {
    const info = COURSES[modalTitle];
    if (!info) return;
    modal.querySelector("[data-m-full]").textContent = rupees(fullPrice());
    modal.querySelector("[data-m-permod]").textContent = rupees(moduleRate());
    modal.querySelectorAll('input[name="aud"]').forEach((r) => {
        r.checked = r.value === audience;
        r.parentElement.querySelector("[data-aud-price]").textContent = rupees(RATE[r.value]) + " / module";
    });
    renderModuleList(modal.querySelector("[data-m-modules]"), info, moduleRate, selected, () => { updateTotal(); refreshPrices(); });
    updateTotal();
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
    if (RATE[audienceSelect.value]) audience = audienceSelect.value;   // keep in step with the form
    modal.querySelector("[data-m-level]").textContent = card.querySelector(".course-level").textContent.trim();
    modal.querySelector("[data-m-title]").textContent = modalTitle;
    modal.querySelector("[data-m-desc]").textContent = info.description;

    selected = new Set(info.modules.map((_, i) => i));   // full course selected by default
    refreshPrices();

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

// choosing who is joining changes the fee
modal.querySelectorAll('input[name="aud"]').forEach((r) =>
    r.addEventListener("change", () => {
        audience = r.value;
        audienceSelect.value = audience;
        refreshPrices();
    })
);
audienceSelect.addEventListener("change", () => { if (RATE[audienceSelect.value]) audience = audienceSelect.value; });

// both card buttons open the pop-up, where the visitor picks who is joining and the modules
document.querySelectorAll(".course-card").forEach((card) => {
    card.querySelector(".course-info-btn").addEventListener("click", () => openCourse(card));
    card.querySelector(".course-btn").addEventListener("click", () => openCourse(card));
});

modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeCourse));
modal.querySelector(".modal-enroll").addEventListener("click", () => {
    const info = COURSES[modalTitle];
    const detail = `${audience} – ${selectionText(info)}`;
    audienceSelect.value = audience;
    closeCourse();
    handleRegister(modalTitle, "course", detail);
    regSyncFromInterest();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeCourse();
});

/* 3d. "Course & Payment" block on the registration form itself
       (the same module picker + Pay Now, without needing to open a course card) */
const regCourseSelect = document.getElementById("regCourse");
const regPayBox = document.getElementById("regPayBox");
const regModules = document.getElementById("regModules");
let regSelected = new Set();

function regModuleRate() {
    return RATE[audienceSelect.value] || RATE["PSR Engineering College"];
}
const regFullPrice = () => COURSE_PRICE;   // full course is always ₹1,000, for every college
const regTotal = (info) => (regSelected.size === info.modules.length ? COURSE_PRICE : regSelected.size * regModuleRate());

function regRenderModules(title) {
    const info = COURSES[title];
    renderModuleList(regModules, info, regModuleRate, regSelected, () => { regUpdateTotal(); regRenderModules(title); });
}

function regSelectionText() {
    const info = COURSES[regCourseSelect.value];
    const n = regSelected.size;
    if (n === info.modules.length) return `Full course – ${rupees(regFullPrice())}`;
    const nums = [...regSelected].sort((a, b) => a - b).map((i) => i + 1).join(", ");
    return `Module${n > 1 ? "s" : ""} ${nums} – ${rupees(regTotal(info))}`;
}

function regUpdateTotal() {
    const info = COURSES[regCourseSelect.value];
    if (!info) return;
    const n = regSelected.size;
    document.getElementById("regSelected").textContent =
        n === info.modules.length ? `Full course (all ${n} modules)` : `${n} of ${info.modules.length} modules selected`;
    document.getElementById("regTotal").textContent = rupees(regTotal(info));
    document.getElementById("regPayBtn").disabled = n === 0;
    document.getElementById("regPayPanel").hidden = true;
    setRegType(`Course Enrollment: ${regCourseSelect.value} (${audienceSelect.value || "PSR Engineering College"} – ${regSelectionText()})`);
}

regCourseSelect.addEventListener("change", () => {
    const title = regCourseSelect.value;
    if (!title || !COURSES[title]) {
        regPayBox.hidden = true;
        setRegType("General Enquiry");
        return;
    }
    regPayBox.hidden = false;
    regSelected = new Set(COURSES[title].modules.map((_, i) => i));
    regRenderModules(title);
    regUpdateTotal();
});
audienceSelect.addEventListener("change", () => {
    if (regCourseSelect.value && COURSES[regCourseSelect.value]) {
        regRenderModules(regCourseSelect.value);
        regUpdateTotal();
    }
});

document.getElementById("regPayBtn").addEventListener("click", () => {
    const title = regCourseSelect.value;
    const info = COURSES[title];
    const total = regTotal(info);
    const full = regSelected.size === info.modules.length;
    const links = PAYMENT_LINKS[title] || {};
    const link = full ? links.student : "";

    const panel = document.getElementById("regPayPanel");
    const upiBox = document.getElementById("regPayUpi");
    const linkBtn = document.getElementById("regPayLink");
    const note = document.getElementById("regPayNote");
    document.getElementById("regPayAmount").textContent = rupees(total);
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });

    linkBtn.hidden = !link;
    if (link) linkBtn.href = link;

    upiBox.hidden = !UPI_ID;
    if (UPI_ID) {
        document.getElementById("regPayUpiId").textContent = UPI_ID;
        const q = `pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(UPI_NAME)}&am=${total}&cu=INR` +
                  `&tn=${encodeURIComponent(title + (full ? " full course" : " " + regSelected.size + " modules"))}`;
        drawUpiQr(document.getElementById("regPayQr"), "upi://pay?" + q);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const appLinks = {
            gpay: (isIOS ? "gpay://upi/pay?" : "tez://upi/pay?") + q,
            phonepe: "phonepe://pay?" + q,
            paytm: "paytmmp://pay?" + q,
            upi: "upi://pay?" + q
        };
        upiBox.querySelectorAll(".pay-app").forEach((a) => (a.href = appLinks[a.dataset.app]));
        note.textContent = `After paying, send the payment screenshot to ${CONTACT_EMAIL} and mention: ${title} – ${audienceSelect.value} – ${regSelectionText()}.`;
    } else if (link) {
        note.textContent = "Pay securely online using the button above, then send the receipt to " + CONTACT_EMAIL + ".";
    } else {
        note.textContent = "Online payment is not set up yet. Please contact us at " + CONTACT_EMAIL + " to pay and confirm your seat.";
    }
});
document.getElementById("regPayCopy").addEventListener("click", (e) => {
    if (navigator.clipboard) navigator.clipboard.writeText(UPI_ID).then(() => (e.target.textContent = "Copied"));
});

// When "Enroll Now" / "View Details" pre-fill the form, also select the matching course here
function regSyncFromInterest() {
    const val = document.getElementById("interest").value;
    const m = val.match(/^Course Enrollment: (.+?) \(/);
    if (m && COURSES[m[1]] && regCourseSelect.value !== m[1]) {
        regCourseSelect.value = m[1];
        regPayBox.hidden = false;
        regBuildModules(m[1]);
        regUpdateTotal();
    }
}


/* Pay Now: shows the UPI ID and buttons for GPay, PhonePe, Paytm and other UPI apps
   (plus a card / net banking link when PAYMENT_LINKS is filled for the full course) */
modal.querySelector(".modal-pay").addEventListener("click", () => {
    const info = COURSES[modalTitle];
    const total = selectedTotal(info);
    const full = selected.size === info.modules.length;
    const links = PAYMENT_LINKS[modalTitle] || {};
    const link = full ? links.student : "";

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
        drawUpiQr(upiBox.querySelector("[data-pay-qr]"), "upi://pay?" + q);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const appLinks = {
            gpay: (isIOS ? "gpay://upi/pay?" : "tez://upi/pay?") + q,
            phonepe: "phonepe://pay?" + q,
            paytm: "paytmmp://pay?" + q,
            upi: "upi://pay?" + q
        };
        upiBox.querySelectorAll(".pay-app").forEach((a) => (a.href = appLinks[a.dataset.app]));
        note.textContent = `After paying, send the payment screenshot to ${CONTACT_EMAIL} and mention: ${modalTitle} – ${audience} – ${selectionText(info)}.`;
    } else if (link) {
        note.textContent = "Pay securely online using the button above, then send the receipt to " + CONTACT_EMAIL + ".";
    } else {
        note.textContent = "Online payment is not set up yet. Please contact us at " + CONTACT_EMAIL + " to pay and confirm your seat.";
    }
});
// Draws a UPI-payment QR code into `container` for the given upi:// link (offline, no external service).
function drawUpiQr(container, upiLink) {
    if (!container || typeof qrcode !== "function") return;
    container.innerHTML = "";
    const qr = qrcode(0, "M");   // type 0 = auto-size, "M" = medium error correction
    qr.addData(upiLink);
    qr.make();
    container.innerHTML = qr.createSvgTag({ scalable: true });
}

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
                    audience: data.get("audience"),
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
        const body = `Interested in: ${interest}\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\nRegistering as: ${data.get("audience")}\nCollege / School: ${data.get("college")}\nDepartment: ${data.get("department")}`;
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
