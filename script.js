async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const message = input.value.trim();

    if (!message) return;

    // 1. Afficher ton message
    chatWindow.innerHTML += `<p><strong>Vous:</strong> ${message}</p>`;
    input.value = '';

    try {
        // On utilise cette API car elle est très fiable
        const response = await fetch('https://www.affirmations.dev/');
        const data = await response.json();

        // 2. Afficher la réponse de l'API
        // On ajoute un petit texte pour faire "Marketing"
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> [Digital Advice] ${data.affirmation}</p>`;

    } catch (error) {
        // Si l'API bloque encore, ce message de secours s'affichera
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> Marketing is about values. Your brand is what people say about you.</p>`;
    }

    // Scroll automatique
    chatWindow.scrollTop = chatWindow.scrollHeight;
}
