import streamlit as st
import google.generativeai as genai

st.set_page_config(page_title="Maghribi AI", page_icon="🤖")

# Jib l-key
if "GEMINI_API_KEY" in st.secrets:
    api_key = st.secrets["GEMINI_API_KEY"]
    genai.configure(api_key=api_key)
    # HNA L-BEDDIL: Khdem b gemini-1.5-flash-8b (khfif w kheddam 100%)
    model = genai.GenerativeModel('gemini-1.5-flash-8b')
else:
    st.error("Zid l-API key f Secrets!")
    st.stop()

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
        # Kan-jerrbo l-jawab
        response = model.generate_content(prompt)
        with st.chat_message("assistant"):
            st.markdown(response.text)
        st.session_state.messages.append({"role": "assistant", "content": response.text})
    except Exception as e:
        st.error(f"Error: {e}")
