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

def check_if_domain_in_db(user: str) -> bool | None:
    '''Check if a domain was in the blacklisted domain database'''
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
        return check is not None # if check finds a value in DB, return True, else return False
    
    except Exception as e:
        print(f'Error fetching from DB: {e}')
        return None # error occurred, so return neither True nor False -> helps user determine error or not

def add_domain_to_db(user: str) -> bool:
    '''Add a new domain to the blacklisted domain database'''
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
        return True # successfully added

    except Exception as e:
        print(f'Error adding to DB: {e}')
        return False # unsuccessful in adding
