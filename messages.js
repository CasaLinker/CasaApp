export function init() {
    loadConversations();
}

function loadConversations() {
    const conversations = [
        { id: 'john', name: 'John Doe', lastMessage: 'Hey, is the apartment still available?', time: '3 mins ago' },
        { id: 'jane', name: 'Jane Smith', lastMessage: 'Thanks for the viewing!', time: '1 hour ago' }
    ];

    const conversationList = document.getElementById('conversation-list');
    conversationList.innerHTML = conversations.map(conv => `
        <a href="#" class="list-group-item list-group-item-action" data-contact="${conv.id}">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${conv.name}</h5>
                <small>${conv.time}</small>
            </div>
            <p class="mb-1">${conv.lastMessage}</p>
        </a>
    `).join('');

    document.querySelectorAll('.list-group-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const contactId = item.getAttribute('data-contact');
            loadChat(contactId);
        });
    });
}

function loadChat(contactId) {
    const messages = [
        { sender: 'john', text: 'Hi, I\'m interested in your listing.', time: '10:00 AM' },
        { sender: 'me', text: 'Sure, when would you like to view it?', time: '10:05 AM' }
    ];

    document.getElementById('chat-header').innerText = `Chat with ${contactId}`;
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = messages.map(msg => `
        <div class="message ${msg.sender === 'me' ? 'sent' : 'received'}">
            <p>${msg.text}</p>
            <small>${msg.time}</small>
        </div>
    `).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function sendMessage() {
    const message = document.getElementById('chat-input').value;
    if (message.trim()) {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML += `
            <div class="message sent">
                <p>${message}</p>
                <small>${new Date().toLocaleTimeString()}</small>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        document.getElementById('chat-input').value = '';
    }
}