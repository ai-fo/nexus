from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chat_manager import ChatManager
import json
import os
from dotenv import load_dotenv

# Chargement des variables d'environnement
load_dotenv()

app = FastAPI()

# Autoriser le CORS pour le front (à adapter selon domaine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Création du chat manager avec le système RAG amélioré
# On peut configurer le mode et le seuil de similarité
api_mode = os.environ.get("API_MODE", "api")
seuil = float(os.environ.get("SEUIL_SIMILARITE", "0.15"))
chat_manager = ChatManager(mode=api_mode, seuil_similarite=seuil)

class MessageRequest(BaseModel):
    session_id: str
    message: str

class MessageResponse(BaseModel):
    humanized: str | None
    answer: str
    debug_info: dict | None = None

@app.post("/chat", response_model=MessageResponse)
async def chat_endpoint(req: MessageRequest):
    # Traitement du message par le chat manager
    debug_json, answer = chat_manager.chat(req.session_id, req.message)
    
    # Convertir le JSON de debug en objet Python
    try:
        debug_info = json.loads(debug_json)
        
        # Pour éviter l'affichage dans le frontend, on retourne une chaîne vide
        # tout en gardant les informations dans debug_info
        humanized = ""
        
        # Retourner la réponse formatée
        return MessageResponse(
            humanized=humanized, 
            answer=answer, 
            debug_info=debug_info
        )
    except:
        # En cas d'erreur de parsing JSON
        return MessageResponse(
            humanized="", 
            answer=answer
        )

@app.post("/clear_history")
async def clear_history_endpoint(req: MessageRequest):
    chat_manager.clear_history(req.session_id)
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "API backend RAG opérationnelle"}

@app.get("/config")
async def get_config():
    """Récupère la configuration actuelle du système RAG."""
    return {
        "mode": chat_manager.mode,
        "seuil_similarite": chat_manager.seuil_similarite,
        "status": "ok"
    }

@app.post("/config")
async def update_config(config: dict):
    """Met à jour la configuration du système RAG."""
    # Mise à jour du seuil de similarité si fourni
    if "seuil_similarite" in config:
        try:
            chat_manager.seuil_similarite = float(config["seuil_similarite"])
        except (ValueError, TypeError):
            return {"status": "error", "message": "Seuil de similarité invalide"}
    
    # Mise à jour du mode si fourni
    if "mode" in config and config["mode"] in ["api", "local"]:
        chat_manager.mode = config["mode"]
    
    return {
        "status": "ok",
        "mode": chat_manager.mode,
        "seuil_similarite": chat_manager.seuil_similarite
    } 