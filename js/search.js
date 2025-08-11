function initializeHardcodedSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const allSuggestions = searchResults ? searchResults.querySelectorAll('li') : [];

    if (!searchInput || !searchResults) {
        console.error('Search elements not found in navbar');
        return;
    }

    console.log('Initializing hardcoded search functionality');

    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase().trim();

        if (!searchTerm) {
            searchResults.style.display = 'none';
            return;
        }

        let hasMatches = false;
        allSuggestions.forEach(suggestion => {
            const searchData = suggestion.getAttribute('data-search') || '';
            const title = suggestion.getAttribute('data-title') || '';

            if ((searchData && searchData.includes(searchTerm)) || (title && title.toLowerCase().includes(searchTerm))) {
                suggestion.style.display = 'block';
                hasMatches = true;
            } else {
                suggestion.style.display = 'none';
            }
        });

        searchResults.style.display = hasMatches ? 'block' : 'none';
    });

    allSuggestions.forEach(suggestion => {
        suggestion.style.cursor = 'pointer';
        suggestion.style.padding = '10px';
        suggestion.style.borderBottom = '1px solid #eee';

        suggestion.addEventListener('click', function () {
            const url = this.getAttribute('data-url');
            if (url) {
                const finalUrl = resolveSiteUrl(url);
                window.location.href = finalUrl;
            }
        });

        suggestion.addEventListener('mouseenter', function () {
            this.style.backgroundColor = '#f5f5f5';
        });
        suggestion.addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'white';
        });
    });

    const searchButton = document.querySelector('.search-container button');
    if (searchButton) {
        searchButton.addEventListener('click', function (e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            if (!searchTerm) return;

            for (let suggestion of allSuggestions) {
                const searchData = suggestion.getAttribute('data-search') || '';
                const title = suggestion.getAttribute('data-title') || '';
                if ((searchData && searchData.includes(searchTerm)) || (title && title.toLowerCase().includes(searchTerm))) {
                    const url = suggestion.getAttribute('data-url');
                    if (url) {
                        const finalUrl = resolveSiteUrl(url);
                        window.location.href = finalUrl;
                        return;
                    }
                }
            }
        });
    }

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });

    searchInput.addEventListener('focus', function () {
        const searchTerm = this.value.toLowerCase().trim();
        if (searchTerm) {
            const event = new Event('input');
            this.dispatchEvent(event);
        }
    });
}