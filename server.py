from flask import Flask, request, jsonify

from flask_cors import CORS

from langchain_ollama import OllamaLLM

import requests

import base64

import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

model = OllamaLLM(model="llama3.1")

@app.route('/image-generator', methods=['POST'])
def get_image():
    try:
        url = "http://127.0.0.1:7861"
        
        payload = request.json

        print(payload)

        response = requests.post(url=f'{url}/sdapi/v1/txt2img', json=payload)
        print(response.json())
        r = response.json()

        i = random.randint(0, 1000)

        with open(f'output{i}.png', 'wb') as f:
            f.write(base64.b64decode(r['images'][0]))

        return jsonify(r)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/story-generator', methods=['POST'])
def get_history():
    try:
        data = request.json
        
        if 'text' not in data:
            return jsonify({'error': 'Missing input text'}), 400
        
        input_text = data['text']
        
        result = model.invoke(input=input_text)
        
        print(f"Model response: {result}") 
        
        return jsonify({'story': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/names-generator', methods=['POST'])
def get_monster_name():
    try:
        data = request.json
        if 'text' not in data:
            return jsonify({'error': 'Missing input text'}), 400
        input_text = data['text']
        result = model.invoke(input=input_text)
        print(f"Model response: {result}") 
        return jsonify({'monster_name': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/theme-generator', methods=['POST'])
def get_theme_color():
    try:
        data = request.json
        if 'text' not in data:
            return jsonify({'error': 'Missing input text'}), 400
        input_text = data['text']
        result = model.invoke(input=input_text)
        print(f"Model response: {result}") 
        return jsonify({'color': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)