async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value;
    if (!message) return;

    // Afficher le message de l'utilisateur
    appendMessage('Vous', message);
    input.value = '';

    // Appel à une API (Exemple générique)
    try {
        const response = await fetch('TA_URL_API', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: message })
        });
        const data = await response.json();
        appendMessage('Chatbot', data.reply);
    } catch (error) {
        appendMessage('Chatbot', "Désolé, j'ai un souci technique.");
    }
}

function appendMessage(sender, text) {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
}
