import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

tokenizer = AutoTokenizer.from_pretrained("cybersectony/phishing-email-detection-distilbert_v2.4.1")
model = AutoModelForSequenceClassification.from_pretrained("cybersectony/phishing-email-detection-distilbert_v2.4.1")

def predict_phishing(input_text):
    # Preprocess and tokenize
    inputs = tokenizer(
        input_text,
        return_tensors="pt",
        truncation=True,
        max_length=512
    )
    
    # Get prediction
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    # Get probabilities for each class
    probs = predictions[0].tolist()
    
    # Create labels dictionary
    labels = {
        "legitimate_email": probs[0],
        "phishing_url": probs[1],
        "legitimate_url": probs[2],
        "phishing_url_alt": probs[3]
    }
    
    # Determine the most likely classification
    max_label = max(labels.items(), key=lambda x: x[1])
    
    return {
        "prediction": max_label[0],
        "confidence": max_label[1],
        "all_probabilities": labels
    }

input_file = input("Enter file: ")
with open(input_file, 'r') as file:
    content = file.read()
prediction = predict_phishing(content)
phishing_chance = (prediction["all_probabilities"]["phishing_url"] + prediction["all_probabilities"]["phishing_url_alt"]) * 100
print(f"We predict that there is a {round(phishing_chance, 2)}% chance that this message involves phishing.")