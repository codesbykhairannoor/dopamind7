import argparse
import json
import os
import sys
import pickle

try:
    import pdfplumber
except ImportError:
    pdfplumber = None

try:
    from docx import Document
except ImportError:
    Document = None

try:
    from pptx import Presentation
except ImportError:
    Presentation = None

def extract_file_text(file_path):
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}", "text": ""}
    
    ext = os.path.splitext(file_path)[1].lower()
    text = ""
    
    try:
        if ext == '.pdf':
            if pdfplumber is None: return {"error": "pdfplumber is not installed", "text": ""}
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                        
        elif ext == '.docx':
            if Document is None: return {"error": "python-docx is not installed", "text": ""}
            doc = Document(file_path)
            for para in doc.paragraphs:
                text += para.text + "\n"
                
        elif ext == '.pptx':
            if Presentation is None: return {"error": "python-pptx is not installed", "text": ""}
            prs = Presentation(file_path)
            for slide in prs.slides:
                for shape in slide.shapes:
                    if hasattr(shape, "text"):
                        text += shape.text + "\n"
                        
        else:
            return {"error": f"Unsupported file type: {ext}", "text": ""}
            
        return {"text": text.strip()}
    except Exception as e:
        return {"error": f"Failed to extract text: {str(e)}", "text": ""}

def predict_archetypes(text, model_dir="."):
    # Normalize text
    text_lower = text.lower()
    
    # Try to load models if they exist
    vectorizer_path = os.path.join(model_dir, "tfidf_vectorizer.pkl")
    classifier_path = os.path.join(model_dir, "classifier.pkl")
    
    competencies_output = {}
    archetypes_output = {}
    
    # If ML models exist, use them
    if os.path.exists(vectorizer_path) and os.path.exists(classifier_path):
        try:
            with open(vectorizer_path, 'rb') as f:
                vectorizer = pickle.load(f)
            with open(classifier_path, 'rb') as f:
                classifier = pickle.load(f)
                
            # Perform prediction
            features = vectorizer.transform([text])
            if hasattr(classifier, "predict_proba"):
                probs = classifier.predict_proba(features)[0]
                classes = classifier.classes_
                # Map all class probabilities
                for cls, prob in zip(classes, probs):
                    archetypes_output[str(cls)] = float(prob) * 100
                
                # Sort and keep top 5
                sorted_archetypes = dict(sorted(archetypes_output.items(), key=lambda item: item[1], reverse=True)[:5])
                
                # Normalize the top 5 so they look like realistic percentage scores (up to 100)
                # Since Naive Bayes probabilities with many classes can be very small (e.g., top is 8%),
                # we scale the top score to 90% and scale the rest proportionally.
                archetypes_output = {}
                if sorted_archetypes:
                    max_raw = max(sorted_archetypes.values())
                    
                    # PELINDUNG: If the model is extremely uncertain (e.g. max probability < 5%),
                    # we trigger an error so the backend falls back to Gemini API.
                    if max_raw < 5.0:
                        return {"error": "Low confidence. Triggering Gemini Fallback."}
                        
                    if max_raw > 0:
                        scale_factor = 95.0 / max_raw
                        
                        # Apply sequential spreading to prevent identical high scores
                        penalty = 0
                        for k, v in sorted_archetypes.items():
                            scaled_v = (v * scale_factor) * 0.9 + 5
                            final_score = min(95, round(scaled_v) - penalty)
                            archetypes_output[k] = final_score
                            penalty += 3 # Next archetype is at least 3% lower
                    else:
                         for k, v in sorted_archetypes.items():
                            archetypes_output[k] = 20
                
            else:
                pred = classifier.predict(features)[0]
                archetypes_output[pred] = 90
        except Exception as e:
            return {"error": f"ML model failed: {str(e)}"}
    else:
         return {"error": "ML models not found. Please train models first."}
            
    # For competencies, let's do a simple extraction of top keywords found in the text to simulate competencies
    # since we don't have a dataset for competencies.
    generic_skills = ["Python", "SQL", "Management", "Finance", "Analysis", "Design", "Communication", "Data", "Security", "Planning"]
    for skill in generic_skills:
        matches = text_lower.count(skill.lower())
        if matches > 0:
            competencies_output[skill] = min(98, 40 + matches * 10)
    
    if not competencies_output:
        competencies_output["General Analysis"] = 50
        
    # Build verdict narrative dynamically based on highest archetype
    best_archetype = max(archetypes_output, key=archetypes_output.get) if archetypes_output else "Unknown"
    best_score = archetypes_output[best_archetype] if archetypes_output else 0
    
    verdict = f"Based on the dataset, your profile strongly aligns with {best_archetype} ({best_score}%). Your coursework demonstrates key vocabulary and patterns associated with this field."
    
    return {
        "competencies": competencies_output,
        "archetypes": archetypes_output,
        "verdict": verdict
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="OneForMind Study Pipeline CLI")
    parser.add_argument("--action", choices=["extract", "predict"], required=True, help="Action to perform")
    parser.add_argument("--file", help="Path to PDF file for extraction")
    parser.add_argument("--text", help="Text content for prediction")
    
    args = parser.parse_args()
    
    if args.action == "extract":
        if not args.file:
            print(json.dumps({"error": "--file argument is required for extract action"}))
        else:
            result = extract_file_text(args.file)
            print(json.dumps(result))
        
    elif args.action == "predict":
        text_content = args.text or ""
        # If text is empty, check if we can read from stdin
        if not text_content and not sys.stdin.isatty():
            text_content = sys.stdin.read()
            
        result = predict_archetypes(text_content, model_dir=os.path.dirname(os.path.abspath(__file__)))
        print(json.dumps(result))
