from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        data = request.json
        
        # Log the message details
        print("\nNew Message Received:")
        print(f"Name: {data.get('name')}")
        print(f"Email: {data.get('email')}")
        print(f"Subject: {data.get('subject')}")
        print(f"Message: {data.get('message')}")
        
        # Return success response
        return jsonify({
            "status": "success",
            "message": "Message received successfully!"
        })
        
    except Exception as e:
        print(f"Error processing message: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "Failed to process message"
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 