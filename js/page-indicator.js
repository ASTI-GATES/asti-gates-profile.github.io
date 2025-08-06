document.addEventListener('DOMContentLoaded', function () {
    // Get the current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Check if we're on the homepage (home.html)
    if (page === "../html/index.html") {
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
    document.body.classList.add('about');
}