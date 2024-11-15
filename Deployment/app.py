from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
import io
from PIL import Image

# สร้างแอป Flask
app = Flask(__name__)
CORS(app)  # เปิดใช้งาน CORS เพื่อให้ React สามารถเรียก API ได้จากโดเมนอื่น

# โหลดโมเดล
model = load_model('./Models/test_DenseNet.keras')

# API สำหรับรับไฟล์ภาพและทำการทำนาย
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
        img = img.resize((224, 224))  # เปลี่ยนขนาดภาพให้ตรงกับ input ของโมเดล
        img_array = np.array(img)  # แปลงภาพเป็น numpy array

        # ทำให้แน่ใจว่าภาพมี 3 channel (RGB)
        if img_array.shape[-1] == 4:
            img_array = img_array[..., :3]

        img_array = np.expand_dims(img_array, axis=0)  # เพิ่มมิติ batch

        # ทำนายผลลัพธ์
        predictions = model.predict(img_array)

        # แสดงค่าผลลัพธ์ทั้งหมด
        print(predictions)  # หรือพิมพ์ดูค่าผลลัพธ์เพื่อดูว่าโมเดลทำนายค่าของแต่ละคลาสได้เท่าไหร่

        # เลือกคลาสที่มีค่ามากที่สุด
        predicted_class = np.argmax(predictions, axis=1)

        # ส่งผลลัพธ์กลับ
        class_names = ['Cassava','SugarCane']
        result = class_names[predicted_class[0]]

        return jsonify({'result': result, 'predictions': predictions.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
