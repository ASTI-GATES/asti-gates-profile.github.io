function loadFooter() {
    fetch('footer.html') // Path to footer.html (same directory)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}
// Call the function to load the footer when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadFooter);