document.addEventListener 'DOMContentLoaded', function () {
    // Get the current page filename
    const path = window.location.pathname;
    const page = path.split("/").pop();


    if (page === "index.html") {

    if (page === "index.html" || page === "") {

        document.body.classList.add('Home');
    } else if (page === "about-gates.html") {
        document.body.classList.add('About');
    } else if (page === "mission-vision.html") {
        document.body.classList.add('Mission-Vision');
    } else if (page === "contact-us.html" || page === "Contact-Us.html") {
        document.body.classList.add('Contact-Us');
    } else if (page === "ai.html") {
        document.body.classList.add('AI-Team');
    } else if (page === "lakehouse.html") {
        document.body.classList.add('Lakehouse');
    } else if (page === "platform.html") {
        document.body.classList.add('Platform');
    } else if (page === "interns.html") {
        document.body.classList.add('Interns');
    }

});
