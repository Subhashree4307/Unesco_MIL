import React from "react";
import { useState } from "react";
import RocketAnimation from "./RocketAnimation";
const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
   //Api call for the detection 

    setTimeout(() => {
      const isFake = Math.random() > 0.6;
      const confidence = (Math.random() * 0.8 + 0.2).toFixed(2);

      setResult({
        isFake,
        confidence,
        message: isFake
          ? "This appears to be a deepfake."
          : "This appears to be authentic.",
      });
      setIsUploading(false);
    }, 2000);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type.startsWith("image/") ||
        droppedFile.type.startsWith("video/"))
    ) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <RocketAnimation />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          Deepfake Detector
        </h2>

        <p className="text-indigo-100 text-center mb-6">
          Upload a video or image to check if it's real or fake
        </p>
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            file
              ? "border-green-400 bg-green-50 bg-opacity-10"
              : "border-indigo-300 hover:border-indigo-200 bg-indigo-500 bg-opacity-20"
          }`}
          onClick={() => document.getElementById("fileInput").click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!file ? (
            <>
              <div className="text-4xl mb-3">📁</div>
              <p className="text-white font-medium">Click to upload</p>
              <p className="text-indigo-200 text-sm mt-1">or drag and drop</p>
              <p className="text-indigo-300 text-xs mt-2">
                Supports images and videos
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <div className="text-green-400 text-3xl">✓</div>
              <p className="text-white font-medium truncate">{file.name}</p>
              <button
                className="text-red-300 hover:text-red-100 text-sm underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
              >
                Remove file
              </button>
            </div>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!file || isUploading}
          className={`w-full mt-6 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
            !file || isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105"
          } text-white shadow-lg`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            "Check for Deepfake"
          )}
        </button>
        {result && (
          <div
            className={`mt-6 p-4 rounded-xl text-center transition-all duration-500 ${
              result.isFake
                ? "bg-red-500 bg-opacity-20 border border-red-400"
                : "bg-green-500 bg-opacity-20 border border-green-400"
            }`}
          >
            <p
              className={`font-bold ${
                result.isFake ? "text-red-200" : "text-green-200"
              }`}
            >
              {result.message}
            </p>
            <p className="text-indigo-100 mt-1">
              Confidence:{" "}
              <span className="font-bold">{result.confidence * 100}%</span>
            </p>
          </div>
        )}
      </div>
    
  );
};

export default UploadForm;
