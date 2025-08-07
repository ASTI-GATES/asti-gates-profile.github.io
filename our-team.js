// Lakehouse team data
const lakehouseStaffData = {
    'john': {
        name: 'First Name Surname',
        position: 'Position',
        image: '../images/josh.jpeg',
        education: 'Degree - College',
        projects: 'Project 1, Project 2',
        skills: 'Python, SQL, etc.',
        email: 'email@example.com',
        motto: 'Motto blah blah'
    },
    'jane': {
        name: 'Jane Smith',
        position: 'Data Scientist',
        image: '../images/jane.jpeg',
        education: 'BS Statistics - Ateneo de Manila University',
        projects: 'Predictive Analytics, Machine Learning Models',
        skills: 'R, Python, TensorFlow, Statistical Analysis',
        email: 'jane.smith@asti.dost.gov.ph',
        motto: 'In data we trust, in insights we act.'
    },
    'mike': {
        name: 'Mike Johnson',
        position: 'Database Administrator',
        image: '../images/mike.jpeg',
        education: 'BS Information Technology - De La Salle University',
        projects: 'Database Optimization, Data Warehouse Management',
        skills: 'PostgreSQL, MongoDB, Database Design, Performance Tuning',
        email: 'mike.johnson@asti.dost.gov.ph',
        motto: 'A well-structured database is the foundation of great analytics.'
    }
};

function showStaffModal(staffId) {
    const staff = lakehouseStaffData[staffId];
    if (!staff) return;
    
    const modalBody = document.getElementById('staffModalBody');
    modalBody.innerHTML = `
        <div class="modal-row">
            <div class="modal-column left">
                <img src="${staff.image}" alt="${staff.name}" class="staff-image">
                <div class="contact-info">
                    <p>
                    <strong> Contact:</strong>
                    <a href="mailto:${staff.email}">${staff.email}</a>
                    <a href="https://www.linkedin.com/" target="_blank">LinkedIn</a>
                    </p>
                </div>
            </div>
            <div class="modal-column right">
                <h2>${staff.name}</h2>
                <h3>${staff.position}</h3>
                <p><strong>Education:</strong> ${staff.education}</p>
                <p><strong>Projects:</strong> ${staff.projects}</p>
                <p><strong>Skills:</strong> ${staff.skills}</p>
                <p><strong>Motto:</strong> "${staff.motto}"</p>
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