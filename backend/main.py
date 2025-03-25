from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# import the model
tokenizer = AutoTokenizer.from_pretrained("cybersectony/phishing-email-detection-distilbert_v2.4.1")
model = AutoModelForSequenceClassification.from_pretrained("cybersectony/phishing-email-detection-distilbert_v2.4.1")

@app.route('/')
def home():
    return 'Hello, World!'

@app.post('/upload-text')
def upload_text():
    user_input = request.form.get("userInput")

    if not user_input:
        return jsonify({"error": "No input received"}), 400

    # Print and process the received input
    print(f'Received user input: {user_input}')
    # check whether the domain of the email was in the DB already
    predictions = predict_phishing(user_input)
    phishing_chance = round((predictions["all_probabilities"]["phishing_url"] + predictions["all_probabilities"]["phishing_url_alt"])
                             * 100, 2)
    return jsonify({"Phishing Probability": phishing_chance})
    
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

@app.route('/api/testing')
def get_test_data():
    insert_into_test_table(['ronald', 200, 'ronald@gmail.com'])
    results = select_all_from_test_table()
    return jsonify(results)

def get_connection():
    """Get a connection to the PostgreSQL database."""
    return psycopg2.connect(
        host="localhost",
        port=5434,  # Using the port you've mapped in docker-compose
        database=os.getenv('POSTGRES_DB_NAME'),  
        user=os.getenv('POSTGRES_USER'), 
        password=os.getenv('POSTGRES_PASSWORD') 
    )

def select_all_from_test_table():
    """Select all records from test_table."""
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM test_table")
        
        records = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return records
    except Exception as e:
        print(f"Error: {e}")
        return []

def insert_into_test_table(data):
    """Insert data into test_table."""
    try:
        conn = get_connection()
        cursor = conn.cursor()
        
        cursor.execute("INSERT INTO test_table (name, age, email) VALUES (%s, %s, %s)", data)
        
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return True
    except Exception as e:
        print(f"Error: {e}")
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)