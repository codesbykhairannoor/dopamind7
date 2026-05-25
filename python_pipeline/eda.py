import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

def generate_eda_and_metrics():
    # Setup paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.join(base_dir, "dataset.csv")
    output_dir = os.path.join(base_dir, "..", "public", "storage", "eda")
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    print("Loading dataset...")
    df = pd.read_csv(dataset_path)
    df = df.dropna(subset=['Category', 'Resume'])

    # 1. EDA: Plot Category Distribution
    plt.figure(figsize=(12, 8))
    category_counts = df['Category'].value_counts()
    sns.barplot(x=category_counts.values, y=category_counts.index, palette="viridis")
    plt.title('Distribusi Kategori Target (Career Archetypes) pada Dataset')
    plt.xlabel('Jumlah Sampel')
    plt.ylabel('Kategori Pekerjaan')
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "category_distribution.png"))
    plt.close()

    # 2. EDA: Text length analysis
    df['Resume_Length'] = df['Resume'].apply(len)
    plt.figure(figsize=(10, 6))
    sns.histplot(df['Resume_Length'], bins=50, kde=True, color='blue')
    plt.title('Distribusi Panjang Teks Coursework/Resume')
    plt.xlabel('Jumlah Karakter')
    plt.ylabel('Frekuensi')
    plt.xlim(0, 10000)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, "text_length_distribution.png"))
    plt.close()

    print("EDA plots saved to public/storage/eda/")

    # 3. Model Performance Evaluation
    print("Evaluating Model Performance...")
    X = df['Resume']
    y = df['Category']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    vectorizer = TfidfVectorizer(lowercase=True, stop_words='english', max_features=5000, ngram_range=(1, 2))
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    model = MultinomialNB(alpha=0.5)
    model.fit(X_train_vec, y_train)

    y_pred = model.predict(X_test_vec)
    
    acc = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred)
    
    print(f"Accuracy: {acc*100:.2f}%")
    print("\nClassification Report:\n", report)

if __name__ == "__main__":
    generate_eda_and_metrics()
