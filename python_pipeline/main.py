from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sys
import os

# Ensure the current directory is in the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from pipeline import predict_archetypes

app = FastAPI(title="OneForMind ML Pipeline")

class PredictRequest(BaseModel):
    text: str
    email: str = None

@app.post("/api/predict.py")
def predict(request: PredictRequest):
    result = predict_archetypes(request.text, model_dir=".", email=request.email)
    
    if request.email == "khairking6@gmail.com":
        print("\n" + "="*50)
        print("🔍 DETAILED ML LOGS FOR KHAIRKING6@GMAIL.COM")
        print("="*50)
        print(f"📄 INPUT TEXT PREVIEW: {request.text[:200]}...")
        print(f"📊 MODEL OUTPUT: {result}")
        print("="*50 + "\n", flush=True)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.get("/")
def read_root():
    return {"status": "OneForMind ML Pipeline is running natively."}
