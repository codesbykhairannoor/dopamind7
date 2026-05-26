import json
import os
import pickle
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length)
        
        try:
            req_data = json.loads(post_data)
            text = req_data.get('text', '').lower()
            
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            model_dir = os.path.join(base_dir, 'python_pipeline')
            
            vectorizer_path = os.path.join(model_dir, 'tfidf_vectorizer.pkl')
            classifier_path = os.path.join(model_dir, 'classifier.pkl')
            
            if not os.path.exists(vectorizer_path) or not os.path.exists(classifier_path):
                self._send_response(500, {"error": f"Model files not found in {model_dir}"})
                return
                
            with open(vectorizer_path, 'rb') as f:
                vectorizer = pickle.load(f)
            with open(classifier_path, 'rb') as f:
                classifier = pickle.load(f)
                
            features = vectorizer.transform([text])
            archetypes_output = {}
            
            if hasattr(classifier, "predict_proba"):
                probs = classifier.predict_proba(features)[0]
                classes = classifier.classes_
                for cls, prob in zip(classes, probs):
                    archetypes_output[str(cls)] = float(prob) * 100
                    
                sorted_archetypes = dict(sorted(archetypes_output.items(), key=lambda item: item[1], reverse=True)[:5])
                archetypes_output = {}
                if sorted_archetypes:
                    max_raw = max(sorted_archetypes.values())
                    if max_raw < 10.0:
                        self._send_response(400, {"error": "Low confidence. Triggering Gemini Fallback."})
                        return
                    if max_raw > 0:
                        scale_factor = 95.0 / max_raw
                        penalty = 0
                        for k, v in sorted_archetypes.items():
                            scaled_v = (v * scale_factor) * 0.9 + 5
                            archetypes_output[k] = min(95, round(scaled_v) - penalty)
                            penalty += 3
                    else:
                         for k, v in sorted_archetypes.items():
                            archetypes_output[k] = 20
            else:
                pred = classifier.predict(features)[0]
                archetypes_output[str(pred)] = 90
                
            self._send_response(200, {"archetypes": archetypes_output})
            
        except Exception as e:
            self._send_response(500, {"error": str(e)})
            
    def _send_response(self, status, payload):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))
