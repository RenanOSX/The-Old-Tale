from flask import Flask, request, jsonify

from flask_cors import CORS

from langchain_ollama import OllamaLLM

import requests

import base64

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

model = OllamaLLM(model="llama3.1")

url = "http://127.0.0.1:7860"

payload = {
    "prompt": "(masterpiece:1.1, good quality, high quality),<lora:add_detail:1>, (Cyberpunk:1), (opponent, enemy:1), vibrant colors, saturated colors",
    "negative_prompt": "bad quality, worse quality:1, medium quality, distorted, foggy, mutated, overexposure, (background:1.2, sole objects, only objects)",
    "steps": 10,
    "batch_size": 3,
    "cfg_scale": 7,
    "width": 512,
    "height": 512,
    "override_settings_restore_afterwards": False,
    "sampler_index": "Euler a",
    "scheduler": "Karras",
    "sd_lora": "add_detail",
    "sd_model_name":"dreamshaper_8",
    "override_settings": {
        "sd_model_checkpoint": "dreamshaper_8",
        "CLIP_stop_at_last_layers": 2
    }
}

response = requests.post(url=f'{url}/sdapi/v1/txt2img', json=payload)

print(response.json())

r = response.json()

print(r)

# Decode and save the image.
for i in range(3):
    with open(f'output{i}.png', 'wb') as f:
        f.write(base64.b64decode(r['images'][i]))

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