import React from "react";
import UploadImage from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-6 tracking-widest shadow-lg hover:scale-110 transform transition duration-300">
        Image Upload
      </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl transition hover:shadow-xl">
        <UploadImage />
      </div>
    </div>
  );
}

export default App;
