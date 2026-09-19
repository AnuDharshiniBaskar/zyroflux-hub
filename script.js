function joinNow() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}


function scrollToCourses() {
    document.getElementById("courses").scrollIntoView({
        behavior: "smooth"
    });
}


function scrollToWorkshops() {
    document.getElementById("workshops").scrollIntoView({
        behavior: "smooth"
    });
}


function learnMore(type) {
    alert(
        "Welcome to Zyroflex Hub!\n\n" +
        "You selected: " + type
    );
}


function register(name) {

    alert(
        "Thank you for your interest in:\n\n" +
        name +
        "\n\nRegistration will be available soon!"
    );

}


function sendMessage(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;

    alert(
        "Thank you, " + name +
        "!\n\nYour message has been received."
    );

    event.target.reset();
}