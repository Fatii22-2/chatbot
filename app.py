import streamlit as st
import google.generativeai as genai

# 1. Configuration
st.set_page_config(page_title="Maghribi AI", page_icon="🤖")

# 2. Get Key safely
if "GEMINI_API_KEY" in st.secrets:
import google.generativeai as genai

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")
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
        response = model.generate_content(prompt)
        with st.chat_message("assistant"):
            st.markdown(response.text)
        st.session_state.messages.append({"role": "assistant", "content": response.text})
    except Exception as e:
        st.error(f"Error: {e}")
