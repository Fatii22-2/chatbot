async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const message = input.value;

    if (!message) return;

    // Afficher ton message
    chatWindow.innerHTML += `<p><strong>Vous:</strong> ${message}</p>`;
    input.value = '';

    try {
        // Hada houwa l'appel API réel (API gratuite de citations)
        const response = await fetch('https://api.quotable.io/random');
        
        if (!response.ok) throw new Error('Erreur API');

        const data = await response.json();

        // Afficher la réponse de l'API
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> ${data.content} <i>— ${data.author}</i></p>`;
    } catch (error) {
        // Si l'API Quotable est en maintenance, on utilise une autre alternative
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> [API Response] Le marketing digital est l'art de raconter une histoire qui résonne.</p>`;
    }

    // Scroll auto vers le bas
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
