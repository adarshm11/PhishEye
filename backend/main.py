from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from utils import load_model, predict_phishing, get_connection

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

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
    phishing_chance = predictions['phishing chance']
    return jsonify({"Phishing Probability": phishing_chance})
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)