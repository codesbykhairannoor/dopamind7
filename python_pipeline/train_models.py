import os
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

def train_and_save_models():
    # Technical descriptions representing each career archetype
    training_data = [
        # Data Engineer
        ("Build data pipelines using Apache Spark and SQL. Extract, transform, load ETL workflows using Airflow.", "Data Engineer"),
        ("Design database warehousing solutions. Manage Postgres and MySQL clusters. Optimize query performance.", "Data Engineer"),
        ("Stream real-time events using Kafka and store in data lakes. Big data systems with Hadoop.", "Data Engineer"),
        ("Structured database tables and schemas. Database migration, ETL pipelines, and data storage.", "Data Engineer"),
        
        # Frontend Architect
        ("Design user interfaces using Vue.js, React, Tailwind CSS, and HTML5. Premium design and responsiveness.", "Frontend Architect"),
        ("Build interactive single page applications. Customize frontend state management with Pinia, Vuex, or Redux.", "Frontend Architect"),
        ("Modern web styling with Tailwind CSS, Flexbox, Grid, CSS animations, and JS web components.", "Frontend Architect"),
        ("Configure Vite and Webpack bundlers. Write clean TypeScript and JavaScript components.", "Frontend Architect"),
        
        # Machine Learning Engineer
        ("Train machine learning models using Scikit-Learn, PyTorch, and TensorFlow.", "Machine Learning Engineer"),
        ("Data analysis and scientific computing with Pandas, NumPy, and Scipy. Visualizing classification boundaries.", "Machine Learning Engineer"),
        ("Deep learning networks, neural structures, natural language processing NLP, and supervised models.", "Machine Learning Engineer"),
        ("Evaluate ML classifier metrics, regression analysis, random forest models, and hyperparameter tuning.", "Machine Learning Engineer"),
        
        # Backend Specialist
        ("Create RESTful APIs and backend services using Laravel PHP, Node.js Express, and Go.", "Backend Specialist"),
        ("Write secure backend auth middleware, controllers, routes, and database models using Eloquent ORM.", "Backend Specialist"),
        ("Develop web servers, microservices, MVC architectures, Redis caching, and relational database migrations.", "Backend Specialist"),
        ("Backend logic integration, API endpoints design, JSON response, server-side validation, and middleware.", "Backend Specialist"),
        
        # DevOps Engineer
        ("Deploy Docker containers and orchestrate microservices with Kubernetes clusters on AWS cloud.", "DevOps Engineer"),
        ("Configure CI/CD automated pipelines using Git, GitHub Actions, and Jenkins.", "DevOps Engineer"),
        ("Infrastructure as Code using Terraform. Linux server admin, shell scripting, and Nginx proxy configs.", "DevOps Engineer"),
        ("Cloud provisioning, server deployment, DevOps automation, pipeline security, and container registry.", "DevOps Engineer"),
    ]
    
    texts = [item[0] for item in training_data]
    labels = [item[1] for item in training_data]
    
    # Instantiate TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(lowercase=True, stop_words='english', ngram_range=(1, 2))
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
