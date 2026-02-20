// Fonction pour envoyer le message
async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const userText = input.value.trim();

    if (!userText) return;

    // 1. Afficher ton message
    chatWindow.innerHTML += `<p><strong>Vous:</strong> ${userText}</p>`;
    input.value = '';

    // 2. Message de chargement
    const loadingId = "loading-" + Date.now();
    chatWindow.innerHTML += `<p id="${loadingId}"><strong>Chatbot:</strong> Réflexion en cours...</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        // Utilisation d'une API de texte libre (plus flexible pour le marketing)
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(userText)}&format=json&no_html=1`);
        const data = await response.json();

        document.getElementById(loadingId).remove();

        // 3. Afficher la réponse
        // Si DuckDuckGo trouve une définition/info, il l'affiche, sinon il donne une phrase marketing
        const reply = data.AbstractText || "En marketing, l'important est de cibler le bon message au bon moment. Pouvez-vous préciser votre question ?";
        
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> ${reply}</p>`;

    } catch (error) {
        document.getElementById(loadingId).remove();
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> Je suis connecté, mais l'API est occupée. Réessayez !</p>`;
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- AJOUT DE LA TOUCHE ENTRÉE ---
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
