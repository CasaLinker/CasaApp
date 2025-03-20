import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

export function init() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        document.getElementById('user-name').textContent = user ? user.displayName || 'User' : 'Guest';
    });

    // Hamburger menu toggle
    const hamburgerButton = document.getElementById('hamburger-button');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    hamburgerButton.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('open');
    });

    // Initialize Bootstrap tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });

    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Example: Load pinned sections (for user customization)
    const pinnedSections = JSON.parse(localStorage.getItem('pinnedSections')) || [];
    console.log('Pinned sections:', pinnedSections); // Add logic to display these if needed
}

// Filter menu items based on search input
export function filterMenuItems(query) {
    const items = document.querySelectorAll('#hamburger-menu li');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// Expose filterMenuItems to global scope since it's called from HTML
window.filterMenuItems = filterMenuItems;