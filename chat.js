export function listenForChat() {
    chatDb.on('child_added', (snapshot) => {
        const message = snapshot.val();
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.innerHTML += `<p><strong>${message.sender}:</strong> ${message.text}</p>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
            new Audio('notification.mp3').play();
        }
    });
}

export function sendMessage() {
    const recipientId = document.getElementById('recipient-id').value;
    const message = document.getElementById('chat-input').value;
    const sender = firebase.auth().currentUser.uid;

    chatDb.push({
        sender: sender,
        recipient: recipientId,
        text: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    document.getElementById('chat-input').value = '';
}