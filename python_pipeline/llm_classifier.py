import sys
import os
import json
import google.generativeai as genai

from dotenv import load_dotenv
import time

# Load environment variables (from .env if exists)
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Ambil semua API keys yang tersedia
api_keys = []
for i in ['', '_2', '_3', '_4']:
    key = os.environ.get(f"GEMINI_API_KEY{i}")
    if key:
        api_keys.append(key)

if not api_keys:
    print(json.dumps({"error": "No GEMINI_API_KEYs are set in environment."}))
    sys.exit(1)

# Daftar model dengan fallback
models = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-1.5-flash-latest'
]

def analyze_coursework(file_path=None, text_content=None):
    contents = []
    
    # Jika input berupa file (gambar/PDF hasil scan untuk OCR)
    if file_path and os.path.exists(file_path):
        contents.append("Tolong ekstrak teks dari dokumen ini secara akurat dan perhatikan struktur halamannya.")
        
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
    
    # Coba loop setiap key
    for key_idx, current_key in enumerate(api_keys):
        genai.configure(api_key=current_key)
        
        # Coba loop setiap model
        for model_name in models:
            try:
                model = genai.GenerativeModel(model_name)
                
                # Jika ada file, kita upload dulu menggunakan API key saat ini
                upload_contents = list(contents)
                if file_path and os.path.exists(file_path):
                    sample_file = genai.upload_file(path=file_path)
                    upload_contents.insert(0, sample_file)
                    
                response = model.generate_content(upload_contents)
                result_text = response.text.strip()
                
                # Bersihkan markdown jika terbawa
                if result_text.startswith("```json"):
                    result_text = result_text.replace("```json", "", 1)
                    if result_text.endswith("```"):
                        result_text = result_text[:-3]
                
                print(result_text.strip())
                return # Berhasil, keluar dari fungsi
                
            except Exception as e:
                error_str = str(e).lower()
                # Jika quota exceeded (429) atau API key tidak valid (403), coba key berikutnya
                if "429" in error_str or "quota" in error_str or "403" in error_str or "api_key_invalid" in error_str:
                    break # Keluar dari loop model, lanjut ke key berikutnya
                    
                # Jika model tidak ditemukan (404), coba model berikutnya
                if "404" in error_str or "not found" in error_str:
                    continue
                
                # Error lain yang bukan dari API/Quota, bisa jadi invalid file, dll.
                # Kita coba model berikutnya untuk berjaga-jaga
                continue
                
    # Jika semua key dan model gagal
    print(json.dumps({"error": "All AI models and API keys failed to process the coursework."}))
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
