from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from chat_manager import ChatManager

app = FastAPI()

# Autoriser le CORS pour le front (à adapter selon domaine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chat_manager = ChatManager()

class MessageRequest(BaseModel):
    session_id: str
    message: str

class MessageResponse(BaseModel):
    humanized: str | None
    answer: str

@app.post("/chat", response_model=MessageResponse)
async def chat_endpoint(req: MessageRequest):
    answers = chat_manager.chat(req.session_id, req.message)
    return MessageResponse(humanized=answers[0], answer=answers[1])

@app.post("/clear_history")
async def clear_history_endpoint(req: MessageRequest):
    chat_manager.clear_history(req.session_id)
    return {"status": "ok"}

@app.get("/")
async def root():
    return {"message": "API backend opérationnelle"} 