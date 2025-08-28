import React from "react";
import Header from "../components/Navbar";
import bg_img from "../assets/bg_img.jpg";
import LottieAnimation from "../components/LottieAnimation";
import { useNavigate } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import DeepFake from "../components/DeepFake";
const Home = () => {
  const navigate = useNavigate();
  const handlePlay = () => {
    navigate("/game");
  };
  return (
    <div className="bg-[#03040C] min-h-screen relative overflow-hidden">
      <div>
        <Header />
        <section className="relative pt-32 pb-20 px-4 md:px-8 min-h-screen flex items-center ">
          <div className="inset-0 z-0 absolute">
            <img
              src={bg_img}
              alt="hero_img"
              className="object-cover w-full h-full"
            />
          </div>
          {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div> */}
          <div className="relative z-20 max-w-7xl mx-auto text-center px-4 md:px-8">
            <h1 className=" font-orbitron text-3xl md:text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Welcome to the
              <br />
              <span className="bg-white text-black px-4 py-2 inline-block font-bold">
                Fight Against Misinformation
              </span>
            </h1>
            <div className="mt-12">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </section>
        <section className="relative min-h-screen px-4 md:px-8 bg-gradient-to-b from-gray-900 via-purple-900 to-black overflow-hidden">
          <div className="max-w-7xl mx-auto relative h-screen">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-8 left-8 w-32 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              <div className="absolute top-12 left-8 w-24 h-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
              <div className="absolute top-8 right-8 w-32 h-1 bg-gradient-to-l from-cyan-400 to-transparent"></div>
              <div className="absolute top-12 right-8 w-24 h-1 bg-gradient-to-l from-purple-400 to-transparent"></div>

              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400"></div>

              <div className="absolute top-20 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div
                className="absolute top-32 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-32 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between h-full pt-20">
              {/* Center content */}
              <div className="flex-1 text-center z-20">
                {/* Main quote */}
                <div className="mb-8">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-none tracking-tight">
                    <span className="block">"EXPLORE.</span>
                    <span className="block">MINE.</span>
                    <span className="block">CONQUER"</span>
                  </h1>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                  <button
                    className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 cursor-pointer
                  "
                    onClick={handlePlay}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.106A1 1 0 008 8v4a1 1 0 001.555.894l3-2a1 1 0 000-1.788l-3-2z" />
                    </svg>
                    <span>Play Now</span>
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V7z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Mini App</span>
                  </button>
                </div>

                <div className="flex justify-center">
                  <div className="animate-bounce">
                    <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
                      <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex justify-end items-center pr-6 md:pr-20">
                <div className="relative w-64 h-64 transform hover:scale-105 transition-transform duration-300">
                  <LottieAnimation />
                  <div
                    className="absolute -top-4 -right-4 text-2xl animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    💎
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 left-0 right-0 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                RABBIT SPACE
              </h2>
              <p className="text-cyan-300 text-xl font-bold mb-4">
                REDEFINE SPACE ADVENTURE
              </p>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                Join the tiny in RabbitSpace. Dive into thrilling cosmic
                adventures with our adorable astronaut bunny.
              </p>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) rotate(0deg);
              }
              33% {
                transform: translateY(-10px) rotate(1deg);
              }
              66% {
                transform: translateY(-5px) rotate(-1deg);
              }
            }
            .animate-float {
              animation: float 4s ease-in-out infinite;
            }
          `}</style>
        </section>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden p-8">
  {/* Animated Floating Stars */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ))}
  </div>

  {/* Foreground Content */}
  <section className="relative z-10 flex flex-col md:flex-row gap-6">
    <div className="flex-1">
      <UploadForm />
    </div>
    <div className="flex-1">
      <DeepFake />
    </div>
  </section>
</div>

      </div>
    </div>
  );
};

export default Home;
