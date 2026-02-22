import streamlit as st
import google.generativeai as genai
import os

# --- CONFIGURATION ---
# Hna kankhbiw l-API Key f "Secrets" bach hta had ma-ychoufha
api_key = st.secrets["GEMINI_API_KEY"]

if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel( model_name='models/gemini-1.5-flash', system_instruction="Ana smiti Maghribi AI, kanchatty ghir b Darija l-maghribiya w kan-jawb b t-felya w d-dahk.")
else:
    st.error("L-API Key ma-khdamach! Check les Secrets.")

# --- INTERFACE ---
st.set_page_config(page_title="Maghribi AI", page_icon="🤖")
st.title("🤖 Chatbot dyali")
st.caption("Chatbot khedam b Gemini API")

# Initialisation dyal l-history
if "messages" not in st.session_state:
    st.session_state.messages = []

# Affichage dyal l-messages l-qdama
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Fin l-user kaykteb
if prompt := st.chat_input("Kteb chi haja..."):
    # Zad l-msg dyal l-user
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Réponse mn AI
    with st.chat_message("assistant"):
        with st.spinner("Tsnna chwiya..."):
            try:
                response = model.generate_content(prompt)
                st.markdown(response.text)
                st.session_state.messages.append({"role": "assistant", "content": response.text})
            except Exception as e:
                st.error(f"Error: {e}")
