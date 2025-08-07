function initSearchRedirect() {
    console.log('Search script initialized'); // Log script initialization
    const pages = [
        { title: "Home", url: "index.html" },
        { title: "AI Team", url: "ai.html" },
        { title: "Contact Us", url: "Contact-Us.html" },
        { title: "About GATES", url: "about-gates.html" },
        { title: "Lakehouse Team", url: "lakehouse.html" },
        { title: "Management", url: "management.html" },
        { title: "Mission & Vision", url: "mission-vision.html" },
        { title: "Platform Team", url: "platform.html" }
    ];
  
    console.log('Search script initialized'); 

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) return;
    let keepDropdownOpen = false;

    // Show dropdown when typing
    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();

        console.log('Search query:', query); // Log search term
        
        searchResults.innerHTML = ''; // Clear previous results
        
        if (query) {
            const matches = pages.filter(page => 
                page.title.toLowerCase().includes(query)
            );
            console.log('Matches found:', matches.length); // Log matches
            
            matches.forEach(page => {
                const li = document.createElement('li');
                li.textContent = page.title;
                li.dataset.url = page.url;
                
                // Using mousedown instead of click to prevent blur interference  
                li.addEventListener('mousedown', function(e) {
                    e.preventDefault();
                    keepDropdownOpen = true;
                    console.log('Selected page:', this.textContent, 'URL:', this.dataset.url);
                    window.location.href = this.dataset.url;
                });
                
                searchResults.appendChild(li);
            });
            
            searchResults.style.display = hasVisibleItems ? 'block' : 'none';
          
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Handle blur event with delay to allow click events
    searchInput.addEventListener('blur', function () {
        console.log('Blur event detected');
        setTimeout(() => {
            if (!keepDropdownOpen) {
                searchResults.style.display = 'none';
            }
            keepDropdownOpen = false;
        }, 200);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}


