function initSearchRedirect() {
    console.log('Search script initialized');
    
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;
    
    // Function to get correct URL based on current page location
    function getCorrectUrl(originalUrl) {
        const currentPath = window.location.pathname;
        const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
        
        // Remove leading slash if present
        let url = originalUrl.startsWith('/') ? originalUrl.substring(1) : originalUrl;
        
        // If we're in the html directory
        if (currentDir.endsWith('/html') || currentPath.includes('/html/')) {
            if (url === 'index.html') {
                return '../index.html';
            } else {
                return url;
            }
        } 
        // If we're in the root directory
        else {
            if (url === 'index.html') {
                return 'index.html';
            } else if (url.startsWith('html/')) {
                return url; // Keep as is
            } else {
                return 'html/' + url; // Add html/ prefix
            }
        }
    }

    // Get all pre-existing search items
    const searchItems = searchResults.querySelectorAll('li[data-search]');
    let keepDropdownOpen = false;

    // Show dropdown when typing
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        console.log('Search query:', query);
        
        let hasVisibleItems = false;
        
        if (query) {
            searchItems.forEach(item => {
                const searchData = item.getAttribute('data-search').toLowerCase();
                const title = item.getAttribute('data-title').toLowerCase();
                
                if (title.includes(query) || searchData.includes(query)) {
                    item.style.display = 'block';
                    hasVisibleItems = true;
                } else {
                    item.style.display = 'none';
                }
            });
            
            searchResults.style.display = hasVisibleItems ? 'block' : 'none';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Handle clicks on search items
    searchItems.forEach(item => {
        item.addEventListener('mousedown', function(e) {
            e.preventDefault();
            keepDropdownOpen = true;
            const originalUrl = this.getAttribute('data-url');
            const title = this.getAttribute('data-title');
            
            // Get the correct URL for current page location
            const finalUrl = getCorrectUrl(originalUrl);
            
            console.log('Current path:', window.location.pathname);
            console.log('Original URL:', originalUrl, 'Final URL:', finalUrl, 'Title:', title);
            
            window.location.href = finalUrl;
        });
    });

    // Handle blur event with delay to allow click events
    searchInput.addEventListener('blur', function() {
        console.log('Blur event detected');
        setTimeout(() => {
            if (!keepDropdownOpen) {
                searchResults.style.display = 'none';
            }
            keepDropdownOpen = false;
        }, 200);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

