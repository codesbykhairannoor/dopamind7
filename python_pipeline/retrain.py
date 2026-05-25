import sys
import os
import csv
import subprocess

def add_feedback_and_retrain(text, correct_category):
    # Output directory (same as pipeline.py)
    output_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(output_dir, "dataset.csv")
    train_script = os.path.join(output_dir, "train_models.py")

    # Clean inputs
    text = text.replace('\n', ' ').replace('\r', '').replace('"', '""')
    
    # Append to dataset.csv
    try:
        with open(dataset_path, 'a', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow([correct_category, text])
        print(f"Added new feedback for category '{correct_category}' to dataset.")
    except Exception as e:
        print(f"Error writing to dataset: {e}")
        sys.exit(1)

    # Trigger retraining
    print("Triggering model retraining...")
    try:
        result = subprocess.run(['python', train_script], capture_output=True, text=True, check=True)
        print("Retraining successful.")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Retraining failed: {e}")
        print(e.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python retrain.py \"Extracted Text\" \"Correct Category\"")
        sys.exit(1)
    
    input_text = sys.argv[1]
    input_category = sys.argv[2]
    
    add_feedback_and_retrain(input_text, input_category)
