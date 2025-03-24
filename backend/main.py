from flask import Flask, jsonify
import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.post('/upload-text')
async def upload_text(file):
    print(f'Received file: {file}')
    return

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