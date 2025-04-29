
# Support Chatbot Backend

Ce projet est un système de chatbot intelligent qui utilise les modèles Mistral AI pour fournir un support aux utilisateurs à partir de transcriptions de documents.

## Prérequis

- Python 3.9 ou supérieur
- pip (gestionnaire de paquets Python)
- Une clé API Mistral (à configurer dans le fichier .env)

## Installation

1. Créer un environnement virtuel (recommandé)

```bash
python -m venv env
source env/bin/activate  # Sur Linux/Mac
env\Scripts\activate     # Sur Windows
```

2. Installer les dépendances

```bash
pip install -r requirements.txt
```

3. Configurer votre clé API Mistral

Assurez-vous que le fichier `.env` contient votre clé API Mistral :
```
MISTRAL_API_KEY=votre_clé_api_mistral
```

## Structure du projet

- `api.py` : Point d'entrée de l'API FastAPI
- `chat_manager.py` : Gestion des conversations et de l'historique
- `rag_transcripts.py` : Système RAG (Retrieval Augmented Generation)
- `humanizer.py` : Génération de messages d'accueil humanisés
- `config.py` : Configuration du projet
- `transcript.py` : Traitement des PDF et extraction de texte
- `transcripts/` : Dossier contenant les transcriptions des documents
- `prompts/` : Dossier contenant les prompts système

## Démarrage du serveur

Pour démarrer le serveur FastAPI :

```bash
uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

## Fonctionnalités

- Traitement de PDF et extraction de texte avec PyMuPDF
- Analyse d'images avec Pixtral pour extraire le texte des images
- Embeddings vectoriels pour la recherche sémantique
- Génération de réponses basées sur les documents avec Mistral AI
- Humanisation des premiers messages pour une expérience utilisateur améliorée

## API Endpoints

- `POST /chat` - Envoyer un message et recevoir une réponse
- `POST /clear_history` - Effacer l'historique de conversation
- `GET /` - Vérification que l'API est opérationnelle
