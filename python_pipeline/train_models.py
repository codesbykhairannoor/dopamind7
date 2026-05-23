import os
import pickle
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

def train_and_save_models():
    # Output directory (same as pipeline.py)
    output_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(output_dir, "dataset.csv")
    
    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}")
        return
        
    print(f"Loading dataset from {dataset_path}...")
    df = pd.read_csv(dataset_path)
    
    # Assume CSV has columns 'Category' and 'Resume'
    # Drop rows with missing values
    df = df.dropna(subset=['Category', 'Resume'])
    
    texts = df['Resume'].tolist()
    labels = df['Category'].tolist()
    
    print(f"Found {len(texts)} training samples across {len(set(labels))} categories.")
    
    # Instantiate TF-IDF Vectorizer
    print("Training TF-IDF Vectorizer...")
    vectorizer = TfidfVectorizer(lowercase=True, stop_words='english', max_features=5000, ngram_range=(1, 2))
    features = vectorizer.fit_transform(texts)
    
    # Train Naive Bayes Classifier
    classifier = MultinomialNB(alpha=0.5)
    classifier.fit(features, labels)
    
    # Output directory (same as pipeline.py)
    output_dir = os.path.dirname(os.path.abspath(__file__))
    
    vectorizer_path = os.path.join(output_dir, "tfidf_vectorizer.pkl")
    classifier_path = os.path.join(output_dir, "classifier.pkl")
    
    with open(vectorizer_path, 'wb') as f:
        pickle.dump(vectorizer, f)
        
    with open(classifier_path, 'wb') as f:
        pickle.dump(classifier, f)
        
    print(f"Models successfully trained and saved!")
    print(f"Vectorizer saved to: {vectorizer_path}")
    print(f"Classifier saved to: {classifier_path}")
    print(f"Classes: {classifier.classes_}")

if __name__ == "__main__":
    train_and_save_models()
