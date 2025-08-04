/ Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Trigger text animations
            const title = entry.target.querySelector('.section-title');
            const description = entry.target.querySelector('.section-description');
            const list = entry.target.querySelector('.section-list');

            if (title) {
                title.style.animationDelay = '0.2s';
                title.style.animationPlayState = 'running';
            }

            if (description) {
                description.style.animationDelay = '0.5s';
                description.style.animationPlayState = 'running';
            }

            if (list) {
                list.style.animationDelay = '0.8s';
                list.style.animationPlayState = 'running';
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.image-content');

    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Smooth hover effects
document.querySelectorAll('.section').forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'scale(1.005)';
    });

    section.addEventListener('mouseleave', () => {
        section.style.transform = 'scale(1)';
    });
});