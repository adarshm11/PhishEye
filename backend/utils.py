import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import psycopg2
import os

def load_model():
    '''Load the pre-trained prediction model from HuggingFace'''
    model_id = 'aamoshdahal/email-phishing-distilbert-finetuned'
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForSequenceClassification.from_pretrained(model_id)
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model.to(device)
    model.eval()
    return model, tokenizer, device

def predict_phishing(input_text):
    '''Given the input text, call the model and predict its chance of being phishing'''
    model, tokenizer, device = load_model()
    encoded_input = tokenizer(input_text, return_tensors='pt', truncation=True, padding=True).to(device)
   
    # Get prediction
    with torch.no_grad():
        outputs = model(**encoded_input)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    # define labels for output
    labels = ['legitimate', 'phishing']
    pred_label = labels[predictions.argmax()]
    confidence = predictions.max().item()

    print(f'Prediction: {pred_label} ({confidence:.2%} confidence)')

    # if the prediction was "legitimate", the phishing chance will be the complement of the confidence %
    if pred_label == 'legitimate':
        confidence = 1 - confidence
    
    return {'phishing chance': confidence * 100} # format the confidence as a percentage of 100

def get_connection():
    '''Get a connection to the PostgreSQL database.'''
    return psycopg2.connect(
        host='localhost',
        port=5434,  # Using the port you've mapped in docker-compose
        database=os.getenv('POSTGRES_DB_NAME'),  
        user=os.getenv('POSTGRES_USER'), 
        password=os.getenv('POSTGRES_PASSWORD') 
    )

def check_if_domain_in_db(domain_name: str) -> bool:
    '''Check if a domain is in the blacklisted domain database'''
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT 1 FROM blacklisted_domains WHERE domain_name = %s LIMIT 1;",
                (domain_name,)
            )
            return cur.fetchone() is not None
    finally:
        conn.close()

def add_domain_to_db(domain_name: str) -> None:
    '''Add a new domain to the blacklisted domain database'''
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO blacklisted_domains (domain_name) VALUES (%s) ON CONFLICT DO NOTHING;",
                (domain_name,)
            )
            conn.commit()
    finally:
        conn.close()

def create_table_if_not_exists():
    '''Create the blacklisted domain table if it doesn't exist'''
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS blacklisted_domains (
                    id SERIAL PRIMARY KEY,
                    domain_name TEXT NOT NULL
                );
            """)
            conn.commit()
    finally:
        conn.close()
