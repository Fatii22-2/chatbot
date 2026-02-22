import streamlit as st
import google.generativeai as genai

# Configuration dyal l-page
st.set_page_config(page_title="Maghribi AI", page_icon="🤖")

# Jib l-key mn l-secrets
if "GEMINI_API_KEY" in st.secrets:
    api_key = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=api_key)
    # Khdem b had smiya deqt bach may-tla3ch error 404
    model = genai.GenerativeModel('gemini-1.5-flash')
else:
    st.error("L-API Key khassha t-zad f Secrets!")
    st.stop()

st.title("🤖 Chatbot dyali")
st.caption("Chatbot khedam b Gemini API")

if "messages" not in st.session_state:
    st.session_state.messages = []

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

if prompt := st.chat_input("Kteb chi haja..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    try:
        response = model.generate_content(prompt)
        with st.chat_message("assistant"):
            st.markdown(response.text)
        st.session_state.messages.append({"role": "assistant", "content": response.text})
    except Exception as e:
        st.error(f"Error: {e}")
