import React, { useState } from "react";

function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("https://abcd1234.ngrok.io/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        อัปโหลดไฟล์ภาพถ่าย sentinel-2 ของอ้อยและมัน
      </h1>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      >
        Upload and Classify
      </button>
      {result && (
        <p className="text-lg text-green-600 font-semibold mt-4">
          ผลการจำแนก: {result}
        </p>
      )}
    </div>
  );
}

export default UploadImage;
