import json
import os

path_en = r'c:\Users\Axioo\dopmymind\lang\partials\en\solutions.json'
path_id = r'c:\Users\Axioo\dopmymind\lang\partials\id\solutions.json'

def clean_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to keep the keys but ensure valid JSON if there are duplicate keys in the source text
    # Standard json.loads() keeps the LAST occurrence of duplicate keys.
    # But usually, it's safer to just load and dump to get a clean, unique-key JSON.
    try:
        data = json.loads(content)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Cleaned {path}")
    except Exception as e:
        print(f"Error cleaning {path}: {e}")

clean_json(path_en)
clean_json(path_id)
