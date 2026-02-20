async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const userText = input.value.trim();

    if (!userText) return;

    // 1. Afficher ton message
    chatWindow.innerHTML += `<p><strong>Vous:</strong> ${userText}</p>`;
    input.value = '';

    // 2. Afficher un message de chargement
    const loadingId = "loading-" + Date.now();
    chatWindow.innerHTML += `<p id="${loadingId}"><strong>Chatbot:</strong> En train de réfléchir...</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        // Utilisation d'un modèle d'IA gratuit via Hugging Face
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ inputs: userText }),
            }
        );

        const data = await response.json();
        
        // Supprimer le message de chargement
        document.getElementById(loadingId).remove();

        // 3. Afficher la vraie réponse de l'IA
        // Note: Blenderbot renvoie parfois un tableau ou un objet direct
        const botReply = data.generated_text || data[0]?.generated_text || "Je n'ai pas compris, peux-tu reformuler ?";
        
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> ${botReply}</p>`;

    } catch (error) {
        document.getElementById(loadingId).remove();
        chatWindow.innerHTML += `<p><strong>Chatbot:</strong> Erreur de connexion à l'IA.</p>`;
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
}
