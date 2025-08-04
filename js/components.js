// Function to include HTML components
function includeHTML(id, file) {
    console.log(`Attempting to load component: ${file} into #${id}`);

    const element = document.getElementById(id);
    if (!element) {
        console.error(`Element with id "${id}" not found`);
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log(`${file} - Ready State: ${xhr.readyState}, Status: ${xhr.status}`);

        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(`Loaded HTML content for ${file}:`, xhr.responseText.substring(0, 100));
                element.innerHTML = xhr.responseText;

                // Update active state if this is the navbar
                if (file === 'navbar.html') {
                    updateActiveNavLink();
                }
            } else {
                console.error(`Error loading component ${file}:`, xhr.status);
                element.innerHTML = `<div style="color: red; padding: 20px;">
                    Error loading ${file}. Status: ${xhr.status}
                    <br>Please ensure all files are in the correct location.
                </div>`;
            }
        }
    };

    xhr.open('GET', `components/${file}`, true);
    xhr.send();
}

// Function to update the active state in navigation
function updateActiveNavLink() {
    console.log('Updating active nav link');
    // Get the current page filename
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);

    // Find all navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    console.log('Found nav links:', navLinks.length);

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if the link href matches the current page
        if (href === currentPage) {
            console.log('Setting active:', href);
            link.classList.add('active');
            // Also add active class to the parent li
            const li = link.closest('li');
            if (li) li.classList.add('active');
        } else {
            link.classList.remove('active');
            const li = link.closest('li');
            if (li) li.classList.remove('active');
        }
    });
}

// Load components when page loads
document.addEventListener('DOMContentLoaded', function () {
    includeHTML('navbar', 'navbar.html');
    includeHTML('footer', 'footer.html');
});