import SpaceGame from "../components/Spacegame";
import Navbar from "../components/Navbar";
const GamePage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-indigo-950 to-black">
      <Navbar/>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-80 w-80 bg-fuchsia-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-cyan-500/20 blur-3xl rounded-full" />
      </div>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[55vh] px-6">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
            Astro Quiz Battle
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Defend against misinformation in space! Shoot down asteroids of fake news 
            while learning essential media literacy skills.
          </p>
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-400">
            <span>🚀</span>
            <span>Educational Gaming</span>
            <span>•</span>
            <span>Media Literacy</span>
            <span>•</span>
            <span>Interactive Learning</span>
            <span>🎯</span>
          </div>
        </div>
      </div>
      
      {/* Game Section */}
      <div className="pb-16">
        <SpaceGame />
      </div>
    </div>
  );
};

export default GamePage;