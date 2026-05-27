import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
import random
import re

print("Loading dataset...")
df = pd.read_csv('dataset.csv').dropna(subset=['Category', 'Resume'])

print(f"Original Dataset Size: {len(df)} rows")
categories = df['Category'].unique()

# Parameters
TARGET_SAMPLES_PER_CATEGORY = 150
augmented_data = []

filler_phrases = [
    "I have experience in ", "Responsible for ", "Worked with a team to ",
    "Managed projects involving ", "Utilized skills in ", "Certified professional in ",
    "A strong background in ", "Demonstrated ability to ", "Spearheaded the development of ",
    "Extensive knowledge of "
]

print("Augmenting and balancing dataset...")
for cat in categories:
    cat_df = df[df['Category'] == cat]
    num_samples = len(cat_df)
    
    # Extract keywords for this category
    vectorizer = CountVectorizer(stop_words='english', max_features=100)
    try:
        vec_fit = vectorizer.fit_transform(cat_df['Resume'])
        keywords = vectorizer.get_feature_names_out()
    except Exception as e:
        print(f"Warning: Could not extract keywords for {cat}. Using generic words.")
        keywords = [cat.lower(), 'professional', 'experience', 'skills']
        
    # Keep original samples
    for text in cat_df['Resume']:
        augmented_data.append({'Category': cat, 'Resume': text})
        
    # Generate synthetic samples if needed
    if num_samples < TARGET_SAMPLES_PER_CATEGORY:
        needed = TARGET_SAMPLES_PER_CATEGORY - num_samples
        for _ in range(needed):
            # Pick random keywords
            sampled_words = random.sample(list(keywords), min(len(keywords), random.randint(15, 30)))
            # Mix with filler phrases
            paragraphs = []
            for _ in range(random.randint(3, 6)):
                sentence = random.choice(filler_phrases) + " ".join(random.sample(sampled_words, min(len(sampled_words), random.randint(3, 8)))) + "."
                paragraphs.append(sentence)
            
            synthetic_resume = " ".join(paragraphs) + f" Expertise in {cat}."
            augmented_data.append({'Category': cat, 'Resume': synthetic_resume})

# Create new balanced dataframe
balanced_df = pd.DataFrame(augmented_data)

# Shuffle it
balanced_df = balanced_df.sample(frac=1, random_state=42).reset_index(drop=True)

print(f"New Balanced Dataset Size: {len(balanced_df)} rows")
print("Distribution per category:")
print(balanced_df['Category'].value_counts())

balanced_df.to_csv('dataset.csv', index=False)
print("Saved to dataset.csv")
