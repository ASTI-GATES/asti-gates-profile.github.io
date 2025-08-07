
fetch('../components/navbar.html') // adjust path if needed
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;

        // ✅ Now that navbar is injected, apply highlight
        const links = document.querySelectorAll('#navbar .nav a');
        const currentPage = window.location.pathname.split('/').pop();

        links.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref.endsWith(currentPage)) {
                link.classList.add('active');
            }
        });
    });
