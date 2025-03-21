import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

export function init() {
    console.log('Initializing dashboard');

    // Hamburger menu toggle
    const hamburgerButton = document.getElementById('hamburger-button');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    if (hamburgerButton && hamburgerMenu) {
        console.log('Hamburger elements found');
        hamburgerButton.addEventListener('click', () => {
            console.log('Hamburger button clicked');
            hamburgerMenu.classList.toggle('open');
        });
    } else {
        console.error('Hamburger button or menu not found');
    }

    // Initialize Bootstrap tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
        new bootstrap.Tooltip(el);
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
        });
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        }
    }

    // Filter menu items based on search input
    window.filterMenuItems = function(query) {
        const items = document.querySelectorAll('#hamburger-menu li');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
        });
    };

    // Example: Load pinned sections (for user customization)
    const pinnedSections = JSON.parse(localStorage.getItem('pinnedSections')) || [];
    console.log('Pinned sections:', pinnedSections); // Add logic to display these if needed
}
