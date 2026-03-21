import json
import os

def clean_json(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

paths = [
    r'c:\Users\Axioo\dopmymind\lang\en.json',
    r'c:\Users\Axioo\dopmymind\lang\id.json'
]

for p in paths:
    if os.path.exists(p):
        clean_json(p)
        print(f"Cleaned {p}")
    else:
        print(f"Path not found: {p}")
