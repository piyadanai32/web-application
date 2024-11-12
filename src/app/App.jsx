import React from "react";
import UploadImage from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-6 tracking-widest shadow-lg">
        Image Upload
      </h1>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <UploadImage />
      </div>
    </div>
  );
}

export default App;
