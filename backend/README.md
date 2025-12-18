# Backend Python - TestGenius

Ce dossier contient la structure du backend Python (Flask/FastAPI) pour l'intégration avec le frontend.

## Structure des Endpoints

Le frontend attend les endpoints suivants :

### `GET /api/health`
Vérification de la santé du backend.

**Réponse :**
```json
{ "status": "ok" }
```

### `POST /api/generate-tests`
Génère les cas de test via l'API Grok.

**Corps de la requête :**
```json
{
  "url": "https://example.com",
  "userStory": "En tant qu'utilisateur, je veux...",
  "customPrompt": "Instructions supplémentaires (optionnel)"
}
```

**Réponse :**
```json
{
  "success": true,
  "testCases": [
    {
      "id": "001",
      "name": "Nom du test",
      "description": "Description du test",
      "type": "nominal|edge_case|error",
      "steps": ["Étape 1", "Étape 2"],
      "expectedResult": "Résultat attendu",
      "status": "pending"
    }
  ]
}
```

### `POST /api/run-tests`
Exécute les tests via Selenium.

**Corps de la requête :**
```json
{
  "testCases": [...],
  "url": "https://example.com"
}
```

**Réponse :**
```json
{
  "success": true,
  "results": {
    "id": "run-123",
    "url": "https://example.com",
    "userStory": "...",
    "timestamp": "2024-01-15T10:30:00Z",
    "testCases": [
      {
        "id": "001",
        "name": "...",
        "status": "passed|failed",
        "duration": 1500,
        "error": "Message d'erreur si échoué"
      }
    ],
    "stats": {
      "total": 5,
      "passed": 4,
      "failed": 1,
      "pending": 0
    }
  }
}
```

## Exemple d'implémentation Flask

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Important pour les appels depuis le frontend

GROK_API_KEY = os.environ.get('GROK_API_KEY')

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/api/generate-tests', methods=['POST'])
def generate_tests():
    data = request.json
    url = data.get('url')
    user_story = data.get('userStory')
    custom_prompt = data.get('customPrompt', '')
    
    # Appeler l'API Grok ici pour générer les tests
    # test_cases = call_grok_api(url, user_story, custom_prompt)
    
    return jsonify({
        "success": True,
        "testCases": test_cases
    })

@app.route('/api/run-tests', methods=['POST'])
def run_tests():
    data = request.json
    test_cases = data.get('testCases')
    url = data.get('url')
    
    # Exécuter les tests avec Selenium ici
    # results = run_selenium_tests(test_cases, url)
    
    return jsonify({
        "success": True,
        "results": results
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Exemple d'implémentation FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    url: str
    userStory: str
    customPrompt: Optional[str] = ""

class TestCase(BaseModel):
    id: str
    name: str
    description: str
    type: str
    steps: List[str]
    expectedResult: str
    status: str = "pending"
    duration: Optional[int] = None
    error: Optional[str] = None

class RunRequest(BaseModel):
    testCases: List[TestCase]
    url: str

@app.get("/api/health")
def health():
    return {"status": "ok"}

@app.post("/api/generate-tests")
def generate_tests(request: GenerateRequest):
    # Appeler l'API Grok ici
    return {"success": True, "testCases": [...]}

@app.post("/api/run-tests")
def run_tests(request: RunRequest):
    # Exécuter Selenium ici
    return {"success": True, "results": {...}}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
```

## Installation

```bash
pip install flask flask-cors requests selenium
# ou pour FastAPI
pip install fastapi uvicorn pydantic requests selenium
```

## Lancement

```bash
# Flask
python app.py

# FastAPI
uvicorn app:app --reload --port 5000
```

## Configuration CORS

Le backend doit accepter les requêtes CORS depuis `http://localhost:8080` (ou l'URL du frontend Lovable).
