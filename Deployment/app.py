from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import io
from PIL import Image

# สร้างแอป Flask
app = Flask(__name__)
CORS(app)

# โหลดโมเดล
model = load_model('./Models/test_DenseNet.keras')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # อ่านไฟล์ภาพ
        img = Image.open(io.BytesIO(file.read()))
        img = img.resize((224, 224))
        img = img.convert("RGB")

        # แปลงภาพเป็น numpy array และ Normalize ค่า
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # ทำนายผลลัพธ์
        predictions = model.predict(img_array)

        # แสดงผลลัพธ์การทำนายเพื่อการดีบัก
        print("Raw predictions:", predictions)

        # ตรวจสอบค่า softmax ของ predictions
        if predictions.shape[1] == 2:  # หากเป็นการจำแนกแบบ 2 คลาส
            class_names = ['Cassava', 'SugarCane']
            predicted_class = np.argmax(predictions, axis=1)
            result = class_names[predicted_class[0]]
            return jsonify({'result': result, 'predictions': predictions.tolist()})
        else:
            return jsonify({'error': 'Unexpected output shape from model'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
