import React, { useState, useEffect, useCallback, useRef } from 'react';
import gamebg from '../assets/game_bg.jpg'
import img from '../assets/01.png'
const SpaceGame = () => {
  const [gameState, setGameState] = useState('playing'); 
  const [playerX, setPlayerX] = useState(235);
  const [bullets, setBullets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [asteroidsDestroyed, setAsteroidsDestroyed] = useState(0);
  const [popupText, setPopupText] = useState('');
  const [score, setScore] = useState(0);


  const GAME_WIDTH = 1200;
  const GAME_HEIGHT = 500;
  const PLAYER_SIZE = 80; 
  const ASTEROID_SIZE = 20;
  const BULLET_WIDTH = 4;
  const BULLET_HEIGHT = 10;

  const SPACE_BG_URL =gamebg
  const PLAYER_SPRITE_URL = img

  const gameAreaRef = useRef(null);
  const keysRef = useRef({ left: false, right: false, space: false });
  const lastShotRef = useRef(0);
  const idCounterRef = useRef(0);

  const loremTexts = [
    "Media literacy is the ability to critically analyze and evaluate information sources, helping you distinguish between reliable news and potential misinformation.",
    "Understanding bias in media helps you become a more informed consumer of information, recognizing when sources might have particular agendas or perspectives.",
    "Fact-checking involves verifying information through multiple reliable sources before accepting or sharing content, especially on social media platforms.",
    "Visual literacy includes analyzing images and videos for manipulation, staging, or misleading context that might distort the intended message.",
    "Digital citizenship encompasses responsible online behavior, including understanding privacy settings and the permanent nature of digital footprints."
  ];

  const getNextId = () => {
    idCounterRef.current += 1;
    return idCounterRef.current;
  };

  const handleKeyDown = useCallback((e) => {
    switch(e.code) {
      case 'ArrowLeft': keysRef.current.left = true; e.preventDefault(); break;
      case 'ArrowRight': keysRef.current.right = true; e.preventDefault(); break;
      case 'Space': keysRef.current.space = true; e.preventDefault(); break;
      default: break;
    }
  }, []);

  const handleKeyUp = useCallback((e) => {
    switch(e.code) {
      case 'ArrowLeft': keysRef.current.left = false; break;
      case 'ArrowRight': keysRef.current.right = false; break;
      case 'Space': keysRef.current.space = false; break;
      default: break;
    }
  }, []);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      // Move player
      setPlayerX(prev => {
        let newX = prev;
        if (keysRef.current.left && prev > 0) newX = prev - 5;
        if (keysRef.current.right && prev < (GAME_WIDTH - PLAYER_SIZE)) newX = prev + 5;
        return newX;
      });

      // Shooting
      if (keysRef.current.space) {
        const now = Date.now();
        if (now - lastShotRef.current > 200) {
          const bulletX = playerX + (PLAYER_SIZE / 2) - (BULLET_WIDTH / 2);
          setBullets(prev => [...prev, { x: bulletX, y: GAME_HEIGHT - (PLAYER_SIZE + 10), id: getNextId() }]);
          lastShotRef.current = now;
        }
      }

      // Move bullets
      setBullets(prev => prev.map(b => ({ ...b, y: b.y - 8 })).filter(b => b.y > 0));

      // Move asteroids
      setAsteroids(prev => prev.map(a => ({ ...a, y: a.y + 3 })).filter(a => a.y < GAME_HEIGHT));

      // Spawn asteroids
      if (Math.random() < 0.02) {
        setAsteroids(prev => [...prev, { x: Math.random() * (GAME_WIDTH - ASTEROID_SIZE), y: -ASTEROID_SIZE, id: getNextId() }]);
      }

      // Check collisions
      setBullets(prevBullets => {
        setAsteroids(prevAsteroids => {
          const newBullets = [...prevBullets];
          const newAsteroids = [...prevAsteroids];

          for (let i = newBullets.length - 1; i >= 0; i--) {
            for (let j = newAsteroids.length - 1; j >= 0; j--) {
              const bullet = newBullets[i];
              const asteroid = newAsteroids[j];

              if (
                bullet.x < asteroid.x + ASTEROID_SIZE &&
                bullet.x + BULLET_WIDTH > asteroid.x &&
                bullet.y < asteroid.y + ASTEROID_SIZE &&
                bullet.y + BULLET_HEIGHT > asteroid.y
              ) {
                newBullets.splice(i, 1);
                newAsteroids.splice(j, 1);

                setScore(prev => prev + 10);
                setAsteroidsDestroyed(prev => {
                  const newCount = prev + 1;
                  if (newCount >= 5) setGameState('quiz');
                  else {
                    setPopupText(loremTexts[Math.floor(Math.random() * loremTexts.length)]);
                    setGameState('popup');
                  }
                  return newCount;
                });
                break;
              }
            }
          }
          return newAsteroids;
        });
        return prevBullets.filter(bullet => 
          !asteroids.some(a => bullet.x < a.x + ASTEROID_SIZE && bullet.x + BULLET_WIDTH > a.x && bullet.y < a.y + ASTEROID_SIZE && bullet.y + BULLET_HEIGHT > a.y)
        );
      });

    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [gameState, playerX, asteroidsDestroyed]);

  // Center the astronaut horizontally on first render
  useEffect(() => {
    setPlayerX(Math.floor((GAME_WIDTH - PLAYER_SIZE) / 2));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const closePopup = () => setGameState('playing');
  const handleQuizAnswer = (isCorrect) => isCorrect ? setGameState('won') : setGameState('gameOver');
  const resetGame = () => {
    setPlayerX(Math.floor((GAME_WIDTH - PLAYER_SIZE) / 2)); setBullets([]); setAsteroids([]); setAsteroidsDestroyed(0); setScore(0);
    setGameState('playing'); keysRef.current = { left: false, right: false, space: false }; lastShotRef.current = 0;
  };

  return (
    <div className='space-game-container'>
    <div className="flex flex-col items-center space-y-6 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
          Space Media Defender
        </h2>
        <p className="text-sm text-gray-400">Score: {score} | Asteroids Destroyed: {asteroidsDestroyed}/5</p>
        <p className="text-xs text-gray-500">Use ← → arrows to move, SPACE to shoot</p>
      </div>

      <div 
        ref={gameAreaRef}
        className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-indigo-900/40 bg-black"
        style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px`, backgroundImage: `url(${SPACE_BG_URL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Decorative space glows */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 bg-fuchsia-600/20 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 bg-cyan-500/20 blur-3xl rounded-full" />

        {/* Player: astronaut sprite */}
        <img
          src={PLAYER_SPRITE_URL}
          alt="astronaut"
          className="absolute select-none"
          style={{ left: `${playerX}px`, bottom: '10px', width: `${PLAYER_SIZE}px`, height: `${PLAYER_SIZE}px`, filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.8))' }}
          draggable={false}
        />

        {/* Bullets */}
        {bullets.map(b => (
          <div
            key={b.id}
            className="absolute bg-yellow-300 rounded-full shadow-[0_0_8px_2px_rgba(250,204,21,0.8)]"
            style={{ left: `${b.x}px`, top: `${b.y}px`, width: `${BULLET_WIDTH}px`, height: `${BULLET_HEIGHT}px` }}
          />
        ))}

        {/* Asteroids */}
        {asteroids.map(a => (
          <div
            key={a.id}
            className="absolute rounded-sm bg-purple-500/90 animate-pulse shadow-[0_0_10px_2px_rgba(168,85,247,0.8)]"
            style={{ left: `${a.x}px`, top: `${a.y}px`, width: `${ASTEROID_SIZE}px`, height: `${ASTEROID_SIZE}px` }}
          />
        ))}
      </div>

      {(gameState === 'popup' || gameState === 'quiz' || gameState === 'won' || gameState === 'gameOver') && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="max-w-md w-[90%] p-6 space-y-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl text-white shadow-2xl">
            {gameState === 'popup' && (
              <>
                <h3 className="text-lg font-semibold">Media Literacy Tip</h3>
                <p className="text-sm leading-relaxed text-gray-200">{popupText}</p>
                <button
                  onClick={closePopup}
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 transition-colors"
                >
                  Continue Game
                </button>
              </>
            )}
            {gameState === 'quiz' && (
              <>
                <h3 className="text-lg font-semibold">Quiz Time!</h3>
                <p className="text-sm text-gray-200">Which of the following is an example of media literacy?</p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuizAnswer(true)}
                    className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    A) Identifying fake news
                  </button>
                  <button
                    onClick={() => handleQuizAnswer(false)}
                    className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
                  >
                    B) Believing everything online
                  </button>
                </div>
              </>
            )}
            {gameState === 'won' && (
              <>
                <h3 className="text-lg font-semibold text-green-400">You Won! 🎉</h3>
                <p className="text-sm text-gray-200">Congratulations! You defended against misinformation.</p>
                <p className="text-sm font-medium">Final Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 transition-colors"
                >
                  Play Again
                </button>
              </>
            )}
            {gameState === 'gameOver' && (
              <>
                <h3 className="text-lg font-semibold text-red-400">Game Over</h3>
                <p className="text-sm text-gray-200">Media literacy involves critically evaluating information, not accepting everything at face value.</p>
                <p className="text-sm font-medium">Final Score: {score}</p>
                <button
                  onClick={resetGame}
                  className="w-full mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 transition-colors"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default SpaceGame;
