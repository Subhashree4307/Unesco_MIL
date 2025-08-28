import React from 'react';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4 border border-purple-500 border-opacity-30 shadow-2xl animate-fadeIn">
        <h3 className="text-xl font-bold text-white mb-4">Did You Know?</h3>
        <p className="text-indigo-200 leading-relaxed mb-6">{content}</p>
        <button
          onClick={onClose}
          className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
`;

export default Modal;