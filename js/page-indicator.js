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

});

// Navbar Active State Management
document.addEventListener('DOMContentLoaded', function () {
    initializeNavbarActiveStates();
    addSlideshowOverlay();
});

function initializeNavbarActiveStates() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const currentPage = getCurrentPage();

    // Set active state based on current page
    navLinks.forEach(link => {
        const linkText = link.textContent.trim().toLowerCase();
        const linkHref = link.getAttribute('href');

        // Remove any existing active classes
        link.classList.remove('active', 'active-underline');

        // Check if this link corresponds to current page
        if (isCurrentPageLink(linkText, linkHref, currentPage)) {
            link.classList.add('active');
        }

        // Add click handler
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active', 'active-underline'));

            // Add active class to clicked link
            this.classList.add('active');

            // Optional: Add pulse effect
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 2000);
        });
    });
}

function getCurrentPage() {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;

    return {
        path: path,
        hash: hash,
        search: search,
        full: path + search + hash
    };
}

function isCurrentPageLink(linkText, linkHref, currentPage) {
    // Check various conditions to determine if link is for current page

    // Home page detection
    if (linkText.includes('home') && (
        currentPage.path === '/' ||
        currentPage.path === '/index.html' ||
        currentPage.path.endsWith('index.html')
    )) {
        return true;
    }

    // Direct href matching
    if (linkHref && (
        currentPage.path.endsWith(linkHref) ||
        currentPage.full.includes(linkHref) ||
        linkHref === currentPage.path
    )) {
        return true;
    }

    // Hash-based navigation
    if (linkHref && linkHref.startsWith('#') && currentPage.hash === linkHref) {
        return true;
    }

    // Page name matching
    const pageName = currentPage.path.split('/').pop().replace('.html', '').toLowerCase();
    if (linkText.includes(pageName) || pageName.includes(linkText)) {
        return true;
    }

    return false;
}

function addSlideshowOverlay() {
    const slideshowContainer = document.querySelector('.slideshow-container');

    if (slideshowContainer) {
        // Check if overlay already exists
        if (!slideshowContainer.querySelector('.slideshow-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'slideshow-overlay';

            overlay.innerHTML = `
                <div class="overlay-content">
                    <h1 class="overlay-title">Welcome to the GATES Project</h1>
                    <p class="overlay-subtitle">Science and Technology Institute - Advancing Innovation Through Research</p>
                </div>
            `;

            slideshowContainer.appendChild(overlay);
        }
    }
}

// Update active state when hash changes (for single-page navigation)
window.addEventListener('hashchange', function () {
    initializeNavbarActiveStates();
});

// Update active state when page loads via back/forward buttons
window.addEventListener('popstate', function () {
    initializeNavbarActiveStates();
});

// Utility function to manually set active nav item
function setActiveNavItem(linkText) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active', 'active-underline');

        if (link.textContent.trim().toLowerCase().includes(linkText.toLowerCase())) {
            link.classList.add('active');
        }
    });
}

// Export functions for external use
window.navbarUtils = {
    initializeNavbarActiveStates,
    setActiveNavItem,
    addSlideshowOverlay
};

