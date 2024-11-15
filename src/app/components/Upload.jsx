import React, { useState } from "react";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");
  const [showPopup, setShowPopup] = useState(false); // สถานะสำหรับป๊อปอัปแจ้งเตือน

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setShowPopup(true); // แสดงป๊อปอัปถ้าไม่มีการเลือกไฟล์
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {  // ใช้ URL ของเซิร์ฟเวอร์ที่ถูกต้อง
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.result);  // กำหนดผลลัพธ์ที่ได้จากเซิร์ฟเวอร์
      } else {
        console.error("Error from server:", response.statusText);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 tracking-wide">
        อัปโหลดไฟล์ภาพถ่าย Sentinel-2 ของอ้อยและมันสำปะหลัง
      </h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 shadow-md"
      >
        อัปโหลดและจำแนก
      </button>
      {result && (
        <p className="text-lg text-green-700 font-semibold mt-4">
          ผลการจำแนก: {result}
        </p>
      )}
      
      {/* ป๊อปอัปแจ้งเตือนแบบเต็มจอ */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
            <p className="text-gray-800 text-lg font-semibold mb-4">
              กรุณาเลือกรูปภาพก่อนอัปโหลด!
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImage;
