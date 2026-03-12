
import json

def deduplicate_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Python 3.7+ preserves insertion order for dicts
    # Reloading it into a new dict will keep the FIRST occurrence typically,
    # but if we want to keep the LAST (which usually has our new values),
    # we can just use the standard json.load which keeps the last one if duplicates exist in the file.
    # Actually, json.load's behavior on duplicate keys is usually "last win".
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    deduplicate_json(r'c:\Users\Axioo\dopmymind\lang\en.json')
    deduplicate_json(r'c:\Users\Axioo\dopmymind\lang\id.json')
    print("Deduplicated en.json and id.json")
