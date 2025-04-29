import os
from mistralai import Mistral
from dotenv import load_dotenv
from config import PROMPTS_DIR

# Charger les variables d'environnement
load_dotenv()

# Initialiser le client Mistral
mistral_client = Mistral(api_key=os.environ["MISTRAL_API_KEY"])

# Charger le prompt system depuis le fichier
with open(PROMPTS_DIR / "humanizer.txt", "r", encoding="utf-8") as f:
    HUMANIZER_PROMPT = f.read().strip()

def humanize_message(question: str) -> str:
    """
    Génère un message très court (quelques mots) et rassurant pour humaniser la conversation, sans RAG.
    """
    messages = [
        {"role": "system", "content": HUMANIZER_PROMPT},
        {"role": "user", "content": question}
    ]
    response = mistral_client.chat.complete(
        model="mistral-small-latest",
        messages=messages,
        max_tokens=20
    )
    return response.choices[0].message.content.strip() 