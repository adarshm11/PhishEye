from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from dotenv import load_dotenv
import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

load_dotenv()

app = Flask(__name__)
CORS(app)

# import the model
tokenizer = AutoTokenizer.from_pretrained("cybersectony/phishing-email-detection-distilbert_v2.4.1")
model = AutoModelForSequenceClassification.from_pretrained("cybersectony/phishing-email-detection-distilbert_v2.4.1")

@app.route('/')
def home():
    return 'Hello, World!'

@app.post('/upload-text')
def upload_text(file):
    file = jsonify(file)
    print(f'Received file: {file}')
    '''
    with open(file, 'r'):
        content = file.read()
    '''
    # check whether the domain of the email was in the DB already
    predictions = predict_phishing(file)
    phishing_chance = round((predictions["all_probabilities"]["phishing_url"] + predictions["all_probabilities"]["phishing_url_alt"])
                             * 100, 2)
    if phishing_chance >= 90:
        # put the user into the DB
        pass

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

'''
@app.route('/api/testing')
def get_test_data():
    
    insert_into_test_table(['ronald', 200, 'ronald@gmail.com'])
    results = select_all_from_test_table()
    return jsonify(results)
    '''

def get_connection():
    """Get a connection to the PostgreSQL database."""
    return psycopg2.connect(
        host="localhost",
        port=5434,  # Using the port you've mapped in docker-compose
        database=os.getenv('POSTGRES_DB_NAME'),  
        user=os.getenv('POSTGRES_USER'), 
        password=os.getenv('POSTGRES_PASSWORD') 
    )

def add_entry_to_db(user):
    '''Add a new user to the database'''
    try:
        conn = get_connection()
        cursor = conn.cursor()
        query = f'''
            INSERT INTO blacklisted_domains (email_address)
            VALUES ?
        '''
        cursor.execute(query, (user,))
        cursor.close()
        conn.commit()
        conn.close()

    except Exception as e:
        print(f'Error adding to DB: {e}')

def check_blacklisted_domain(user):
    '''Check if the sending user of the email is in the database -> don't need to check in model'''
    try:
        conn = get_connection()
        cursor = conn.cursor()
        query = f'''
            SELECT 1 FROM blacklisted_domains
            WHERE email_address = ?
        '''
        cursor.execute(query, (user,))
        check = cursor.fetchall()
        cursor.close()
        conn.close()
        return check is not None
        # check if the return is None -> handle appropriately
    except Exception as e:
        print(f'Error fetching from DB: {e}')

    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)