import React from 'react';
import { useState } from 'react';
const Post = ({ post, onGuess, id }) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleGuess = (guess) => {
    setIsChecking(true);
    setTimeout(() => {
      onGuess(post.id, guess);
      setIsChecking(false);
    }, 1000);
  };

  return (
    <div
      id={id}
      className="bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-purple-500 border-opacity-30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Header */}
      <div className="p-4 border-b border-purple-500 border-opacity-20">
        <h3 className="text-white font-semibold text-lg">{post.username}</h3>
        <p className="text-indigo-200 text-sm mt-1">{post.title}</p>
      </div>

      {/* Media */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={post.mediaUrl}
          alt="Post media"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between">
            <button
              onClick={() => handleGuess('Fake')}
              disabled={isChecking}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isChecking
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 transform'
              }`}
            >
              {isChecking ? 'Analyzing...' : 'Fake'}
            </button>
            <button
              onClick={() => handleGuess('Real')}
              disabled={isChecking}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                isChecking
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105 transform'
              }`}
            >
              {isChecking ? 'Analyzing...' : 'Real'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress indicator during check */}
      {isChecking && (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-400"></div>
        </div>
      )}
    </div>
  );
};

export default Post;