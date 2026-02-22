import streamlit as st
import google.generativeai as genai
import os

# 1. Kan-jibo l-key mn l-secrets
api_key = st.secrets["GEMINI_API_KEY"]

# 2. Hna fin ghadi t-hat dak l-code (Configuration)
if api_key:
    genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')
else:
    st.error("L-API Key ma-khdamach f les Secrets!")

# --- Baqi l-code dyal l-interface ---
st.title("🤖 Chatbot dyali")

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
