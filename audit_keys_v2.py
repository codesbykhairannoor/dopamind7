
import os
import re
import json

def get_keys_from_blade(directory):
    keys = set()
    pattern = re.compile(r"__\(['\"]([^'\"]+)['\"]")
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.blade.php'):
                with open(os.path.join(root, file), 'r', encoding='utf-8') as f:
                    content = f.read()
                    matches = pattern.findall(content)
                    keys.update(matches)
    return keys

def check_missing_keys(json_path, blade_keys):
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    json_keys = set(data.keys())
    # Exclude keys with $i or :feature or other dynamic parts
    missing = [k for k in blade_keys if k not in json_keys and '$' not in k and ':' not in k]
    return missing

if __name__ == "__main__":
    blade_dir = r'c:\Users\Axioo\dopmymind\resources\views\solutions'
    en_json = r'c:\Users\Axioo\dopmymind\lang\en.json'
    id_json = r'c:\Users\Axioo\dopmymind\lang\id.json'
    
    keys = get_keys_from_blade(blade_dir)
    en_missing = check_missing_keys(en_json, keys)
    id_missing = check_missing_keys(id_json, keys)
    
    print("MISSING_EN:")
    for k in sorted(en_missing):
        print(k)
    print("\nMISSING_ID:")
    for k in sorted(id_missing):
        print(k)
