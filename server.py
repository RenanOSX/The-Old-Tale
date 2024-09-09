from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_ollama import OllamaLLM

app = Flask(__name__)
CORS(app)  

model = OllamaLLM(model="llama3.1")

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
    port = 5000
    print(f"Servidor rodando na porta {port}")
    app.run(port=port)