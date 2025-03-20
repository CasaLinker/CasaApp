// Import necessary Firebase Authentication functions
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Initialize the authentication instance (assuming 'app' is globally accessible from CasaLink.js)
const auth = getAuth(window.app);

export function init() {
    document.getElementById('login-form').addEventListener('submit', login);
}

function login(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert('Logged in successfully!');
            loadSection('search');
        })
        .catch(error => alert(error.message));
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert('Registered successfully!'))
        .catch(error => alert(error.message));
}