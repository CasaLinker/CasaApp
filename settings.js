export function init() {
    document.getElementById('theme-select').value = localStorage.getItem('theme') || 'light';
    document.getElementById('notifications-toggle').checked = localStorage.getItem('notifications') === 'true';
    applyTheme(localStorage.getItem('theme') || 'light');
}

export function saveSettings() {
    const theme = document.getElementById('theme-select').value;
    const notifications = document.getElementById('notifications-toggle').checked;
    const language = document.getElementById('language-select').value;
    const newListingNotif = document.getElementById('new-listing-notif').checked;
    const messageNotif = document.getElementById('message-notif').checked;
    const highContrast = document.getElementById('high-contrast').checked;
    const largeFont = document.getElementById('large-font').checked;

    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications);
    localStorage.setItem('language', language);

    applyTheme(theme);
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.classList.toggle('large-font', largeFont);
}

function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
}