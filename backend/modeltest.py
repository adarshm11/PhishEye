from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
from transformers_interpret import SequenceClassificationExplainer

# Load the model and tokenizer from Hugging Face Hub
model_id = "aamoshdahal/email-phishing-distilbert-finetuned"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForSequenceClassification.from_pretrained(model_id)

# Set device (GPU if available)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()

# Example email for prediction
email = """
Dear Employee,\n

We are conducting a routine update to our payroll processing system to improve efficiency and ensure timely compensation. To avoid any delays with the upcoming payroll cycle, please verify and update your direct deposit details using the secure link below:\n

🔒 Verify Payroll Info\n

This process should take less than 2 minutes. Failure to complete the verification by April 30, 2025 may result in payment delays.\n

If you have any questions, please contact Payroll Support.\n

Thank you,\n
Human Resources\n
Company Payroll Services\n
"""

# Tokenize and prepare the input
encoded_input = tokenizer(email, return_tensors='pt', truncation=True, padding=True).to(device)

# Make prediction
with torch.no_grad():
    outputs = model(**encoded_input)
    probs = torch.nn.functional.softmax(outputs.logits, dim=1)

# Output prediction
labels = ["legitimate", "phishing"]
pred_label = labels[probs.argmax()]
confidence = probs.max().item()

print(f"Prediction: {pred_label} ({confidence:.2%} confidence)")

explainer = SequenceClassificationExplainer(model=model, tokenizer=tokenizer)
word_attributions = explainer(email, class_name="LABEL_0")
explainer.visualize()
