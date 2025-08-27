// Load personnel data from JSON
let personnelData = {};

// Load the JSON data
async function loadPersonnelData() {
    try {
        const response = await fetch('../js/asti-personnel.json');
        personnelData = await response.json();
        console.log('Personnel data loaded successfully:', personnelData);
    } catch (error) {
        console.error('Error loading personnel data:', error);
    }
}

// Initialize data on page load
loadPersonnelData();

function showStaffModal(staffId) {
    // Check if data is loaded
    if (!personnelData || Object.keys(personnelData).length === 0) {
        console.error('Personnel data not loaded yet. Retrying...');
        // Retry after a short delay
        setTimeout(() => showStaffModal(staffId), 500);
        return;
    }
    
    console.log('Looking for staff ID:', staffId);
    console.log('Available data:', personnelData);
    
    // Search for staff across all teams
    let staff = null;
    let foundTeam = null;
    
    // Search through all teams
    for (const [teamName, teamMembers] of Object.entries(personnelData)) {
        for (const member of teamMembers) {
            // Try exact match first
            if (member[staffId]) {
                staff = member[staffId];
                foundTeam = teamName;
                break;
            }
            // Try partial match (in case IDs don't match exactly)
            for (const key of Object.keys(member)) {
                if (key.includes(staffId) || staffId.includes(key)) {
                    staff = member[key];
                    foundTeam = teamName;
                    console.log(`Found partial match: ${staffId} -> ${key}`);
                    break;
                }
            }
        }
        if (staff) break;
    }
    
    if (!staff) {
        console.error('Staff member not found:', staffId);
        return;
    }
    
    // Map JSON field names to display format
    const education = staff["Educational Background"] || 'N/A';
    const projects = staff["Projects"] || 'N/A';
    const tenure = staff["Tenure"] || 'N/A';
    const skills = staff["Skills"] || 'N/A';
    const motto = staff["Motto"] || 'N/A';
    const email = staff["Email"] || 'N/A';
    const linkedin = staff["LinkedIn Profile"];
    const name = staff["Name"];
    const position = staff["Position"];
    const image = staff["Image"]; // Use image path from JSON
    
    const modalBody = document.getElementById('staffModalBody');
    modalBody.innerHTML = `
        <div class="modal-row">
            <div class="modal-column left">
                <img src="${image}" alt="${name}" class="staff-image">
                <div class="personal-info">
                    <h2>${name}</h2>
                    <h3>${position}</h3>
                </div>
            </div>
            <div class="modal-column right">
                <div class="profile">
                    <h2>Profile</h2>
                    <p><strong>Education:</strong> ${education}</p>
                    <p><strong>Projects:</strong> ${projects}</p>
                    <p><strong>Tenure:</strong> ${tenure}</p>
                    <p><strong>Skills:</strong> ${skills}</p>
                    <p><strong>Motto:</strong> ${motto}</p>
                </div>
                <div class="contact-info">
                    <p><strong> Email:</strong> ${email !== 'N/A' ? `<a href="mailto:${email}">${email}</a>` : 'N/A'}</p>
                    <p><strong> LinkedIn:</strong> ${linkedin && linkedin !== 'N/A' ? `<a href="${linkedin}" target="_blank">${name}</a>` : 'N/A'}</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('staffModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeStaffModal() {
    document.getElementById('staffModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('staffModal');
    if (event.target === modal) {
        closeStaffModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeStaffModal();
    }
});

// Make functions globally available
window.showStaffModal = showStaffModal;
window.closeStaffModal = closeStaffModal;