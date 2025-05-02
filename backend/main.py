from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from utils import predict_phishing, create_table_if_not_exists, check_if_domain_in_db, add_domain_to_db

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
    # Create blacklisted domain table if it doesn't exist
    create_table_if_not_exists()
    # TODO: Get domain of the email
    domain = '' # placeholder

    # check whether the domain of the email was in the DB already
    if check_if_domain_in_db(domain):
        # if domain exists in DB, do not call predict_phishing and return directly
        return jsonify({'Phishing Probability': 100, 'Message': 'This domain was found to be blacklisted by our services!'})
    
    # if domain does not exist in DB, we continue with evaluation
    phishing_probability = predict_phishing(user_input)
    return jsonify({phishing_probability})
    
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5001)