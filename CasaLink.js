// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCD8T2Kc7rEY2N6S6ZdOIQ2fX-JH3uEns",
    authDomain: "casalink-cfd29.firebaseapp.com",
    projectId: "casalink-cfd29",
    storageBucket: "casalink-cfd29.firebasestorage.app",
    messagingSenderId: "902727382779",
    appId: "1:902727382779:web:c26edb57c051143ed2625e",
    measurementId: "G-9697Y7T4F0"
};

// Initialize Firebase
let app;
let db;
try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization failed:', error);
}

let currentProperties = [];

function loadSection(section) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
    console.log(`Attempting to load section: ${section}`);
    fetch(`./components/${section}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${section}.html: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            console.log(`Loaded ${section}.html successfully`);
            contentDiv.innerHTML = html;
            switch (section) {
                case 'dashboard':
                    // Dynamically load dashboard.css if not already loaded
                    if (!document.querySelector('link[href="./css/dashboard.css"]')) {
                        const link = document.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = './css/dashboard.css';
                        document.head.appendChild(link);
                    }
                    // Insert HTML first, then initialize dashboard.js after a delay
                    setTimeout(() => {
                        import('./js/dashboard.js')
                            .then(module => module.init())
                            .catch(error => console.error('Failed to load dashboard.js:', error));
                    }, 0); // Delay to next event loop
                    break;
                case 'auth':
                    import('./js/auth.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load auth.js:', error));
                    break;
                case 'search':
                    import('./js/search.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load search.js:', error));
                    import('./js/map.js')
                        .then(module => module.initMap())
                        .catch(error => console.error('Failed to load map.js:', error));
                    break;
                case 'listings':
                    import('./js/listings.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load listings.js:', error));
                    break;
                case 'profile':
                    import('./js/profile.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load profile.js:', error));
                    break;
                case 'settings':
                    import('./js/settings.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load settings.js:', error));
                    break;
                case 'messages':
                    import('./js/messages.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load messages.js:', error));
                    break;
                case 'mortgage':
                    import('./js/mortgage.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load mortgage.js:', error));
                    break;
                case 'neighborhoods':
                    import('./js/neighborhoods.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load neighborhoods.js:', error));
                    break;
                case 'reviews':
                    import('./js/reviews.js')
                        .then(module => module.init())
                        .catch(error => console.error('Failed to load reviews.js:', error));
                    break;
                // Static legal pages
                case 'terms':
                case 'privacy':
                case 'disclaimer':
                    // No additional JavaScript needed
                    break;
                default:
                    console.warn(`Unknown section: ${section}`);
            }
        })
        .catch(error => {
            console.error('Error loading section:', error);
            contentDiv.innerHTML = `<p>Sorry, there was an error loading the ${section} section. Please try again.</p>`;
        });
}

// Load dashboard by default when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, starting CasaLink');
    loadSection('dashboard');
});

// Make loadSection globally accessible
window.loadSection = loadSection;