import sys
import os
import json
import google.generativeai as genai

# Konfigurasi Gemini API
# Di environment lokal, usahakan API Key sudah di set.
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    print(json.dumps({"error": "GEMINI_API_KEY is not set in environment."}))
    sys.exit(1)

genai.configure(api_key=api_key)

# Gunakan model yang support vision & text (Gemini 1.5 Flash/Pro sangat ideal)
model = genai.GenerativeModel('gemini-1.5-flash')

def analyze_coursework(file_path=None, text_content=None):
    try:
        contents = []
        
        # Jika input berupa file (gambar/PDF hasil scan untuk OCR)
        if file_path and os.path.exists(file_path):
            # Gemini SDK bisa langsung membaca file image/pdf dan melakukan OCR otomatis
            sample_file = genai.upload_file(path=file_path)
            contents.append(sample_file)
            contents.append("Tolong ekstrak teks dari dokumen ini secara akurat.")
            
        # Jika input berupa teks (fallback)
        if text_content:
            contents.append(f"Teks Coursework:\n{text_content}")
            
        prompt = """
        Sebagai seorang pakar Human Resources dan Data Scientist, analisis bukti akademik (coursework) di atas.
        Lakukan klasifikasi untuk mencocokkan dokumen ini dengan 'Career Archetypes' atau profesi yang paling relevan di industri saat ini.
        Berikan hasil klasifikasi dalam bentuk JSON murni (tanpa markdown), dengan format array object berisi 'archetype' (nama profesi) dan 'score' (persentase kecocokan 0-100).
        
        Contoh output JSON yang valid:
        {
            "archetypes": {
                "Data Scientist": 95,
                "Machine Learning Engineer": 85,
                "Python Developer": 80
            }
        }
        """
        contents.append(prompt)
        
        response = model.generate_content(contents)
        result_text = response.text.strip()
        
        # Bersihkan markdown jika terbawa
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json", "", 1)
            if result_text.endswith("```"):
                result_text = result_text[:-3]
        
        print(result_text.strip())
        
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: python llm_classifier.py --file <path_to_image> OR --text <text>"}))
        sys.exit(1)
        
    mode = sys.argv[1]
    input_data = sys.argv[2]
    
    if mode == "--file":
        analyze_coursework(file_path=input_data)
    elif mode == "--text":
        analyze_coursework(text_content=input_data)
    else:
        print(json.dumps({"error": "Invalid mode."}))
        sys.exit(1)
