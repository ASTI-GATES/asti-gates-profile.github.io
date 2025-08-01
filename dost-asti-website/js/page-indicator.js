document.addEventListener('DOMContentLoaded', function () {
    // Get the current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Check if we're on the homepage (home.html)
    if (page === "home.html") {
        document.body.classList.add('home');
    }
}
if (page === "about.html") {
    document.body.classList.add('about');
}

if (page === "mission-vision.html") {
    document.body.classList.add('mission-vision');
}
