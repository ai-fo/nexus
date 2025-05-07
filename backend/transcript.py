import os
from dotenv import load_dotenv
import base64
from mistralai import Mistral
from pathlib import Path
import fitz  # PyMuPDF
import json
from PIL import Image
import io
import tempfile
from config import PDF_FOLDER, CACHE_DIR, IMAGE_CACHE_FILE, TRANSCRIPTS_DIR, TRANSCRIPTS_TEXT_ONLY_DIR, PIXTRAL_URL, PIXTRAL_PATH, DEFAULT_MODE
import requests

load_dotenv()

def get_pixtral_mode():
    return os.environ.get("PIXTRAL_MODE", DEFAULT_MODE)

def encode_image(image_bytes):
    """Encode une image en base64 à partir des bytes."""
    return base64.b64encode(image_bytes).decode('utf-8')

def analyze_image_with_pixtral(image_bytes):
    """Analyse une image avec Pixtral (mode local ou API)."""
    image_base64 = encode_image(image_bytes)
    mode = get_pixtral_mode()
    
    messages = [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Transcris exactement le texte que tu vois dans cette image. Si tu ne vois pas de texte, décris précisément ce que tu vois dans l'image."},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}}
            ]
        }
    ]
    
    if mode == "api":
        api_key = os.environ["MISTRAL_API_KEY"]
        client = Mistral(api_key=api_key)
        response = client.chat.complete(
            model="pixtral-12b-2409",
            messages=messages,
            max_tokens=500
        )
        return response.choices[0].message.content
    else:
        # Appel local Pixtral
        data = {
            "model": PIXTRAL_PATH,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Voici image:"},
                        {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_base64}"}}
                    ]
                }
            ]
        }
        headers = {"Content-Type": "application/json"}
        response = requests.post(PIXTRAL_URL, headers=headers, json=data)
        return response.json()["choices"][0]["message"]["content"]

def process_pdf(pdf_path):
    """Traite un PDF et retourne sa transcription avec texte et images, et indique s'il contient des images."""
    doc = fitz.open(pdf_path)
    transcript = []
    contains_image = False
    
    # Charger le cache des images si existant
    cache_file = Path(IMAGE_CACHE_FILE)
    if cache_file.exists():
        with open(cache_file, 'r') as f:
            image_cache = json.load(f)
    else:
        image_cache = {}
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Extraire le texte
        text = page.get_text()
        if text.strip():
            transcript.append({"type": "text", "content": text.strip()})
        
        # Extraire les images
        images = page.get_images(full=True)
        for img_idx, img_info in enumerate(images):
            contains_image = True
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            
            # Créer un hash unique pour l'image
            image_hash = f"{pdf_path}_{page_num}_{img_idx}"
            
            # Vérifier si l'image est dans le cache
            if image_hash in image_cache:
                image_description = image_cache[image_hash]
            else:
                # Analyser l'image avec Pixtral
                image_description = analyze_image_with_pixtral(image_bytes)
                # Sauvegarder dans le cache
                image_cache[image_hash] = image_description
            
            transcript.append({
                "type": "image",
                "page": page_num + 1,
                "description": image_description
            })
    
    # Sauvegarder le cache mis à jour
    with open(cache_file, 'w') as f:
        json.dump(image_cache, f, ensure_ascii=False, indent=2)
    
    doc.close()
    return transcript, contains_image

def save_transcript(transcript, pdf_path, contains_image):
    """Sauvegarde la transcription dans un fichier texte dans le dossier transcripts, et indique si le PDF contient une image."""
    output_filename = Path(pdf_path).name.replace('.pdf', '.txt')
    output_path = TRANSCRIPTS_DIR / output_filename
    
    # Organiser les éléments par page
    pages = {}
    for item in transcript:
        page = item.get("page", 1) if item["type"] == "image" else 1
        if page not in pages:
            pages[page] = {"text": [], "images": []}
        if item["type"] == "text":
            pages[page]["text"].append(item["content"])
        else:
            pages[page]["images"].append(item)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        # Écrire le nom du PDF source en haut du fichier
        f.write(f"Transcription de: {Path(pdf_path).name}\n")
        f.write(f"Contient une image : {'OUI' if contains_image else 'NON'}\n")
        f.write("=" * 50 + "\n\n\n")
        
        image_counter = 1  # Compteur pour numéroter les images
        
        # Écrire le contenu page par page
        for page_num in sorted(pages.keys()):
            f.write(f"\n{'=' * 20} PAGE {page_num} {'=' * 20}\n\n")
            
            # Écrire le texte de la page
            for text in pages[page_num]["text"]:
                f.write(text)
                f.write("\n\n")
            
            # Écrire les images de la page
            for image in pages[page_num]["images"]:
                f.write(f"\n{'=' * 20} IMAGE {image_counter} {'=' * 20}\n")
                f.write(image["description"])
                f.write(f"\n{'=' * 60}\n\n")
                image_counter += 1

def save_transcript_text_only(transcript, pdf_path):
    """Sauvegarde uniquement le texte de la transcription dans un fichier texte dans le dossier transcripts_text_only."""
    output_filename = Path(pdf_path).name.replace('.pdf', '.txt')
    output_path = TRANSCRIPTS_TEXT_ONLY_DIR / output_filename
    
    with open(output_path, 'w', encoding='utf-8') as f:
        # Écrire le nom du PDF source en haut du fichier
        f.write(f"Transcription de: {Path(pdf_path).name}\n")
        f.write("=" * 50 + "\n\n")
        
        for item in transcript:
            if item["type"] == "text":
                f.write(item["content"])
                f.write("\n\n")

def process_all_pdfs():
    """Traite tous les PDFs dans le dossier configuré."""
    pdf_folder = Path(PDF_FOLDER)
    # Créer les dossiers nécessaires s'ils n'existent pas
    CACHE_DIR.mkdir(exist_ok=True)
    TRANSCRIPTS_DIR.mkdir(exist_ok=True)
    TRANSCRIPTS_TEXT_ONLY_DIR.mkdir(exist_ok=True)

    # Fichier JSON pour la présence d'images
    image_presence_json = TRANSCRIPTS_DIR / "pdf_image_presence.json"
    if image_presence_json.exists():
        with open(image_presence_json, 'r', encoding='utf-8') as f:
            image_presence_data = json.load(f)
    else:
        image_presence_data = {}

    for pdf_file in pdf_folder.glob("*.pdf"):
        print(f"Traitement de {pdf_file.name}...")
        try:
            transcript, contains_image = process_pdf(pdf_file)
            # Sauvegarder la transcription complète
            save_transcript(transcript, pdf_file, contains_image)
            # Sauvegarder la transcription sans les images
            save_transcript_text_only(transcript, pdf_file)
            # Mettre à jour le JSON
            image_presence_data[pdf_file.name] = contains_image
            print(f"Transcription terminée pour {pdf_file.name}")
            print(f"Fichier complet sauvegardé dans: {TRANSCRIPTS_DIR / pdf_file.name.replace('.pdf', '.txt')}")
            print(f"Fichier texte uniquement sauvegardé dans: {TRANSCRIPTS_TEXT_ONLY_DIR / pdf_file.name.replace('.pdf', '.txt')}")
        except Exception as e:
            print(f"Erreur lors du traitement de {pdf_file.name}: {str(e)}")
    # Sauvegarder le JSON mis à jour
    with open(image_presence_json, 'w', encoding='utf-8') as f:
        json.dump(image_presence_data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    process_all_pdfs()