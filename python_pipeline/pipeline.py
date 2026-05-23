import argparse
import json
import os
import sys
import pickle

# We try to import pdfplumber, if it fails, we will print an error
try:
    import pdfplumber
except ImportError:
    pdfplumber = None

def extract_pdf_text(file_path):
    if not os.path.exists(file_path):
        return {"error": f"File not found: {file_path}", "text": ""}
    
    if pdfplumber is None:
        return {"error": "pdfplumber is not installed", "text": ""}
    
    try:
        text = ""
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return {"text": text.strip()}
    except Exception as e:
        return {"error": f"Failed to extract text: {str(e)}", "text": ""}

def predict_archetypes(text, model_dir="."):
    # Pre-defined career archetypes mapping to keywords
    archetype_keywords = {
        "Data Engineer": ["sql", "python", "spark", "etl", "hadoop", "kafka", "pipeline", "database", "warehousing", "airflow", "postgresql", "mysql"],
        "Frontend Architect": ["vue", "react", "javascript", "css", "html", "tailwind", "typescript", "webpack", "vite", "ui", "ux", "frontend"],
        "Machine Learning Engineer": ["python", "pytorch", "tensorflow", "scikit-learn", "sklearn", "pandas", "numpy", "deep learning", "ml", "model", "neural", "nlp", "ai"],
        "Backend Specialist": ["php", "laravel", "node", "express", "go", "api", "rest", "postgres", "mysql", "redis", "docker", "mvc", "backend"],
        "DevOps Engineer": ["aws", "docker", "kubernetes", "ci/cd", "git", "terraform", "linux", "cloud", "nginx", "jenkins", "kubernetes"]
    }
    
    competency_keywords = {
        "Python Programming": ["python", "pip", "py"],
        "Database Systems": ["sql", "database", "postgres", "mysql", "query", "nosql", "mongodb"],
        "Software Engineering": ["git", "api", "mvc", "php", "laravel", "javascript", "code", "architecture"],
        "Data Analytics": ["pandas", "numpy", "excel", "visualization", "tableau", "powerbi", "analysis"],
        "Machine Learning": ["scikit-learn", "pytorch", "tensorflow", "model", "training", "supervised", "unsupervised"],
        "Web Development": ["html", "css", "vue", "react", "tailwind", "frontend", "http", "js"]
    }

    # Normalize text
    text_lower = text.lower()
    
    # Try to load models if they exist
    vectorizer_path = os.path.join(model_dir, "tfidf_vectorizer.pkl")
    classifier_path = os.path.join(model_dir, "classifier.pkl")
    
    competencies_output = {}
    archetypes_output = {}
    
    # If ML models exist, try to use them
    if os.path.exists(vectorizer_path) and os.path.exists(classifier_path):
        try:
            with open(vectorizer_path, 'rb') as f:
                vectorizer = pickle.load(f)
            with open(classifier_path, 'rb') as f:
                classifier = pickle.load(f)
                
            # Perform prediction
            features = vectorizer.transform([text])
            # Assuming classifier outputs probabilities for each class
            if hasattr(classifier, "predict_proba"):
                probs = classifier.predict_proba(features)[0]
                classes = classifier.classes_
                for cls, prob in zip(classes, probs):
                    archetypes_output[str(cls)] = round(float(prob) * 100)
            else:
                pred = classifier.predict(features)[0]
                for cls in archetype_keywords.keys():
                    archetypes_output[cls] = 90 if cls == pred else 30
        except Exception as e:
            # Fallback if pickle loading or inference fails
            pass

    # If ML prediction failed or models didn't exist, use the fallback heuristic classifier
    if not archetypes_output:
        # Heuristic scoring
        archetype_matches = {}
        for archetype, keywords in archetype_keywords.items():
            matches = sum(1 for kw in keywords if kw in text_lower)
            archetype_matches[archetype] = matches
            
        total_matches = sum(archetype_matches.values())
        if total_matches > 0:
            for archetype, matches in archetype_matches.items():
                # Score is a combination of matching keywords density and baseline
                # Limit match contribution to 70% and give a base 30% based on relevance
                base_score = 40 if matches > 0 else 10
                match_score = (matches / len(archetype_keywords[archetype])) * 60
                archetypes_output[archetype] = min(98, round(base_score + match_score))
        else:
            # Flat default scores if no keywords match at all
            archetypes_output = {
                "Data Engineer": 30,
                "Frontend Architect": 30,
                "Machine Learning Engineer": 30,
                "Backend Specialist": 30,
                "DevOps Engineer": 30
            }
            
    # Calculate competency scores based on text mentions
    for comp, keywords in competency_keywords.items():
        matches = sum(text_lower.count(kw) for kw in keywords)
        if matches == 0:
            score = 40  # default baseline
        elif matches == 1:
            score = 65
        elif matches == 2:
            score = 80
        else:
            score = min(98, 80 + matches * 2)
        competencies_output[comp] = score
        
    # Build verdict narrative dynamically based on highest archetype
    best_archetype = max(archetypes_output, key=archetypes_output.get)
    best_score = archetypes_output[best_archetype]
    
    verdicts = {
        "Data Engineer": f"Strong engineering foundations. Showing a {best_score}% alignment with Data Engineering roles, driven by solid database queries and structured text understanding.",
        "Frontend Architect": f"A creative and structural developer. High frontend alignment ({best_score}%) with Vue/CSS elements detected in your artifacts.",
        "Machine Learning Engineer": f"Analytical and model-driven. Alignment of {best_score}% with ML roles, showing understanding of statistical model concepts and Python data scripts.",
        "Backend Specialist": f"Architecture and server reliability focused. High Backend Specialization ({best_score}%) due to MVC structuring and API endpoint logs.",
        "DevOps Engineer": f"Infrastructure and pipeline master. Alignment of {best_score}% with DevOps, exhibiting understanding of containerization and workflow automation."
    }
    
    verdict = verdicts.get(best_archetype, f"Balanced portfolio showing progress across software domains. Best alignment is with {best_archetype} at {best_score}%.")
    
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
            sys.exit(1)
        result = extract_pdf_text(args.file)
        print(json.dumps(result))
        
    elif args.action == "predict":
        text_content = args.text or ""
        # If text is empty, check if we can read from stdin
        if not text_content and not sys.stdin.isatty():
            text_content = sys.stdin.read()
            
        result = predict_archetypes(text_content)
        print(json.dumps(result))
