# PhishShield
![image](https://github.com/user-attachments/assets/7194453c-298b-4bfa-97f2-2e0823c88dd4)
# Overview
With so many modes of online communication nowadays, there are a large assortment of risks. Phishing is a common practice on texting and emailing apps, with users encountering messages that appear to be from a known source with routine instructions but instead lead to the compromising of critical information. For this reason, there is a need to protect online users from the dangers of phishing. PhishShield seeks to accomplish this, utilizing machine learning and natural language processing to evaluate messages and predict whether or not these messages contain phishing attempts. 
Recent research has demonstrated the effectiveness of BERT-based models for phishing detection in emails. Notably, DistilBERT has proven to be the most efficient model, offering high accuracy while utilizing fewer computational resources [1]. By leveraging this research, PhishShield can adopt a similar approach to enhance phishing detection.

# Approaches
The structure of this application is a simple, full-stack design. The frontend will be built in React.js for a simplistic user-friendly experience. It will be connected to a Python backend, built using the Flask library, providing a lightweight framework for hosting a machine learning model. 

Due to time constraints, we will not be developing our own original ML model. Instead, for phishing detection, we will integrate the pre-trained DistilBERT model from Hugging Face, which has been fine tuned for multilabel classification of Emails and URLs as safe or potentially phishing [2].

Finally, to complete the app, a PostgreSQL database will be used to store blacklisted domains and IPs. This can help optimize the time needed to process text, as messages from the blacklisted domains will automatically be flagged without requiring further evaluation.

# References
[1]	M. Songailaitė, E. Kankevičiūtė, B. Zhyhun, and J. Mandravickaitė, “BERT-Based Models for Phishing Detection.” Available: https://ceur-ws.org/Vol-3575/Paper4.pdf
[2]	“cybersectony/phishing-email-detection-distilbert_v2.4.1 · Hugging Face,” Huggingface.co, Oct. 28, 2024. https://huggingface.co/cybersectony/phishing-email-detection-distilbert_v2.4.1 (accessed Mar. 23, 2025).
