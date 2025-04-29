import os
from collections import defaultdict, deque
from typing import List, Dict, Any
from rag_transcripts import TranscriptRAG
from config import TRANSCRIPTS_DIR
from humanizer import humanize_message

class ChatManager:
    def __init__(self, transcripts_dir=TRANSCRIPTS_DIR, max_history=10):
        self.rag = TranscriptRAG(str(transcripts_dir))
        self.rag.load_all_transcripts()
        self.histories = defaultdict(lambda: deque(maxlen=max_history))  # historique par utilisateur/session

    def add_message(self, session_id: str, role: str, content: str):
        self.histories[session_id].append({"role": role, "content": content})

    def get_history(self, session_id: str) -> List[Dict[str, str]]:
        return list(self.histories[session_id])

    def clear_history(self, session_id: str):
        self.histories[session_id].clear()

    def build_context(self, session_id: str) -> str:
        """
        Construit un contexte textuel à partir de l'historique pour l'inclure dans le prompt RAG.
        Si le premier message assistant est un message humanisé, on l'indique explicitement pour éviter la répétition.
        """
        history = self.get_history(session_id)
        context_lines = []
        for i, msg in enumerate(history):
            prefix = "Utilisateur" if msg["role"] == "user" else "Assistant"
            # Si c'est le premier message assistant (donc humanisé)
            if msg["role"] == "assistant" and i == 1 and len(history) > 1:
                context_lines.append(f"{prefix} (message d'accueil, ne pas répéter) : {msg['content']}")
            else:
                context_lines.append(f"{prefix} : {msg['content']}")
        return "\n".join(context_lines)

    def chat(self, session_id: str, user_message: str) -> List[str]:
        # Ajoute le message utilisateur à l'historique
        self.add_message(session_id, "user", user_message)
        history = self.get_history(session_id)
        # Si c'est le tout premier message utilisateur, on humanize
        if len(history) == 1:
            humanized = humanize_message(user_message)
            self.add_message(session_id, "assistant", humanized)
            # On construit le contexte avec ce message humanisé
            context = self.build_context(session_id)
            response = self.rag.query(context)
            self.add_message(session_id, "assistant", response)
            return [humanized, response]
        else:
            # Pour les messages suivants, on ne humanize plus
            context = self.build_context(session_id)
            response = self.rag.query(context)
            self.add_message(session_id, "assistant", response)
            return [None, response]

# Exemple d'utilisation
if __name__ == "__main__":
    chat_manager = ChatManager()
    session_id = "test_user"
    while True:
        user_input = input("Vous: ")
        if user_input.lower() in ["exit", "quit"]:
            break
        answers = chat_manager.chat(session_id, user_input)
        print(f"Assistant (humanisation): {answers[0]}")
        print(f"Assistant (réponse): {answers[1]}\n") 