import React, { useState, useEffect, useRef } from "react";
import Post from "./Post";
import Modal from "./Modal";

const DeepFake = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const containerRef = useRef(null);

  // Mock data generator
  const generateMockPost = (id) => ({
    id,
    username: ["AstroAI", "CosmicExplorer", "NeuralNebula", "QuantumObserver"][
      id % 4
    ],
    mediaUrl: `https://source.unsplash.com/random/600x400/?space,${
      ["galaxy", "moon", "nebula", "rocket"][id % 4]
    }`,
    isDeepfake: Math.random() > 0.5,
    title: [
      "A mysterious alien planet discovered!",
      "Live from the lunar surface",
      "This galaxy was created by AI... or was it?",
      "SpaceX launch in real time!",
    ][id % 4],
  });

  // Load initial posts
  useEffect(() => {
    setPosts(Array.from({ length: 3 }, (_, i) => generateMockPost(i + 1)));
  }, []);

  // Infinite scroll logic
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
        setLoading(true);
        setTimeout(() => {
          const newPosts = Array.from({ length: 3 }, (_, i) =>
            generateMockPost(posts.length + i + 1)
          );
          setPosts((prev) => [...prev, ...newPosts]);
          setLoading(false);
        }, 800);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, posts]);

  const handleGuess = (postId, guess) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const isCorrect = guess === (post.isDeepfake ? "Fake" : "Real");

    if (isCorrect) {
      // Pulse animation
      const element = document.getElementById(`post-${postId}`);
      if (element) {
        element.classList.add("animate-pulse");
        setTimeout(() => {
          element.classList.remove("animate-pulse");
        }, 800);
      }
    } else {
      const messages = {
        Fake: "This video was generated using AI deepfake technology. Look for subtle inconsistencies in lighting, shadows, or facial symmetry.",
        Real: "This is authentic footage. Real videos often have natural imperfections like lens flare, background noise, or motion blur.",
      };
      setModalContent(messages[guess]);
      setModalOpen(true);
    }
  };

  return (
    <div className=" relative overflow-hidden">
      <div className="relative z-10 max-w-lg mx-auto px-4 py-0 h-full">

        {/* Scrollable Feed Container */}
        <div
          ref={containerRef}
          className="bg-gray-900 bg-opacity-70 backdrop-blur-sm border border-purple-500 border-opacity-30 rounded-2xl overflow-y-auto max-h-[calc(100vh-4rem)] shadow-2xl"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#8b5cf6 #1e1b4b" }}
        >
          <div className="p-2 space-y-4">
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onGuess={handleGuess}
                id={`post-${post.id}`}
              />
            ))}
            {loading && (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-400"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        content={modalContent}
      />
    </div>
  );
};

export default DeepFake;
