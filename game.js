const NumberGuessingGame = () => {
  const [secretNumber, setSecretNumber] = React.useState(null);
  const [guess, setGuess] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [attempts, setAttempts] = React.useState(0);
  const [gameWon, setGameWon] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [particles, setParticles] = React.useState([]);
  
  React.useEffect(() => {
    startNewGame();
  }, []);
  
  const startNewGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setFeedback('I\'m thinking of a number between 1 and 100...');
    setAttempts(0);
    setGameWon(false);
    setHistory([]);
  };
  
  const createParticles = (color) => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        color: color,
        delay: Math.random() * 0.5
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2000);
  };
  
  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback('Please enter a valid number between 1 and 100');
      return;
    }
    
    setAttempts(attempts + 1);
    const newHistory = [...history, num];
    setHistory(newHistory);
    
    if (num === secretNumber) {
      setFeedback(`🎉 Correct! You found it in ${attempts + 1} attempts!`);
      setGameWon(true);
      createParticles('#10b981');
    } else if (num < secretNumber) {
      const diff = secretNumber - num;
      if (diff < 5) {
        setFeedback('🔥 Very close! A tiny bit higher!');
      } else if (diff < 10) {
        setFeedback('↗️ Getting warm, try higher');
      } else {
        setFeedback('↑ Too low, go higher');
      }
    } else {
      const diff = num - secretNumber;
      if (diff < 5) {
        setFeedback('🔥 Very close! A tiny bit lower!');
      } else if (diff < 10) {
        setFeedback('↘️ Getting warm, try lower');
      } else {
        setFeedback('↓ Too high, go lower');
      }
    }
    setGuess('');
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameWon) {
      handleGuess();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md relative overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}s`,
              animation: 'float 2s ease-in-out forwards'
            }}
          />
        ))}
        
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Number Guessing Game
        </h1>
        
        <div className="mb-6 p-4 bg-gray-700 rounded-lg text-center text-lg">
          {feedback}
        </div>
        
        {!gameWon ? (
          <div className="space-y-4">
            <input
              type="number"
              min="1"
              max="100"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              placeholder="Enter your guess..."
            />
            
            <button
              onClick={handleGuess}
              className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              Guess
            </button>
          </div>
        ) : (
          <button
            onClick={startNewGame}
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Play Again
          </button>
        )}
        
        <div className="mt-6">
          <div className="text-sm text-gray-400 mb-2">
            Attempts: {attempts}
          </div>
          
          {history.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {history.map((num, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm ${
                    num === secretNumber
                      ? 'bg-green-600'
                      : Math.abs(num - secretNumber) < 10
                      ? 'bg-orange-600'
                      : 'bg-gray-600'
                  }`}
                >
                  {num}
                </span>
              ))}
            </div>
          )}
        </div>
        
      </div>
      
      <style>{
        `@keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
          }
        }`
      }</style>
    </div>
  );
};

ReactDOM.render(<NumberGuessingGame />, document.getElementById('root'));