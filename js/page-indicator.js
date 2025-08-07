document.addEventListener 'DOMContentLoaded', function () {
    // Get the current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();


    if (page === "index.html") {
        document.body.classList.add('Home');
    }
}
if (page === "about.html") {
    document.body.classList.add('About');
}

if (page === "mission-vision.html") {
    document.body.classList.add('Mission-Vision');

}
if (page === "Contact-Us.html") {
    document.body.classList.add('Contact-Us');

}
if (page === "ai.html") {
    document.body.classList.add('About');
    document.body.classList.add('AI-Team');
}

if (page === "lakehouse.html") {
    document.body.classList.add('About');
    document.body.classList.add('Lakehouse');
}

if (page === "platform.html") {
    document.body.classList.add('About');
    document.body.classList.add('Platform');
}
if (page === "interns.html") {
    document.body.classList.add('About');
    document.body.classList.add('Interns');
}
