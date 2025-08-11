
const SITE_BASE = '/asti-gates-profile.github.io/asti-gates-profile.github.io';

const currentPath = window.location.pathname;
const isInSubfolder = currentPath.includes('/html/');
const componentsPath = isInSubfolder ? '../components/' : 'components/';


function resolveSiteUrl(href) {
    if (!href) return href;
    if (href.startsWith('http')) return href;

    // Normalize SITE_BASE to have no leading/trailing slash (we'll add it below if needed)
    const baseClean = SITE_BASE ? SITE_BASE.replace(/^\/+|\/+$/g, '') : '';
    const basePrefix = baseClean ? `/${baseClean}/` : '/';

    // Remove leading slashes from href so URL resolves consistently
    const raw = href.replace(/^\/+/, '');

    // Use URL to compute absolute href against origin + basePrefix
    const resolved = new URL(raw, window.location.origin + basePrefix);
    return resolved.href; // full absolute URL (includes origin)
}

function loadComponent(elementId, fileName) {
    console.log(`Loading ${fileName} into #${elementId}`);

    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found`);
        return Promise.reject(`Element #${elementId} not found`);
    }


    return fetch(`${componentsPath}${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
            console.log(`Successfully loaded ${fileName}`);
            return data;
        })
        .catch(error => {
            console.error(`Error loading ${fileName}:`, error);
            element.innerHTML = `<div style="color: red; padding: 20px;">
                Error loading ${fileName}: ${error.message}
                <br>Please ensure all files are in the correct location.
            </div>`;
            throw error;
        });
}

function fixNavbarLinks() {
    document.querySelectorAll('#navbar a').forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;
        const abs = resolveSiteUrl(href);
        link.setAttribute('href', abs);
    });
}


function updateActiveNavLink() {
    console.log('Updating active nav link');

    const currentPage = currentPath.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);

    const navLinks = document.querySelectorAll('#navbar nav ul li a');
    console.log('Found nav links:', navLinks.length);

    navLinks.forEach(link => {

        const href = link.getAttribute('href') || link.href || '';
        const li = link.closest('li');

        if (href.endsWith(currentPage)) {
            link.classList.add('active');
            if (li) li.classList.add('active');
        } else {
            link.classList.remove('active');
            if (li) li.classList.remove('active');
        }
    });
}

// Init
function initializeNavbar() {
    loadComponent('navbar', 'navbar.html')
        .then(() => {
            // IMPORTANT: fix links first, then run active-link detection and search init
            fixNavbarLinks();
            updateActiveNavLink();
            initializeHardcodedSearch();
        })
        .catch(error => {
            console.error('Failed to initialize navbar:', error);
        });

    const footerElement = document.getElementById('footer');
    if (footerElement) {
        loadComponent('footer', 'footer.html')
            .catch(error => {
                console.error('Failed to load footer:', error);
            });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavbar);
} else {
    initializeNavbar();
}

