import React, { useState } from 'react';
import { Play, Trophy, ArrowLeft, Check, X } from 'lucide-react';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface GamesProps {
  profile: KidProfile;
}

interface Game {
  id: number;
  title: string;
  description: string;
  category: string;
  ageRange: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
  isPlayable: boolean;
}

const Games: React.FC<GamesProps> = ({ profile }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameScreen, setGameScreen] = useState<'menu' | 'playing'>('menu');

  const mockGames: Game[] = [
    {
      id: 1,
      title: "Emoji Charades",
      description: "Guess what the emojis are trying to tell you! A fun game of pictures and imagination.",
      category: "Word Games",
      ageRange: "6-12",
      difficulty: "easy",
      icon: "😄",
      isPlayable: true
    },
    {
      id: 2,
      title: "3 Truths and a Lie",
      description: "Can you spot the fake fact among the real ones? Test your knowledge and detective skills!",
      category: "Logic",
      ageRange: "8-12",
      difficulty: "medium",
      icon: "🕵️",
      isPlayable: false
    },
    {
      id: 3,
      title: "Math Adventure",
      description: "Solve fun math problems while going on an exciting treasure hunt adventure!",
      category: "Educational",
      ageRange: "6-10",
      difficulty: "easy",
      icon: "🔢",
      isPlayable: false
    },
    {
      id: 4,
      title: "Animal Sound Quiz",
      description: "Listen to animal sounds and guess which animal makes each noise! Perfect for nature lovers.",
      category: "Nature",
      ageRange: "6-9",
      difficulty: "easy",
      icon: "🐾",
      isPlayable: false
    },
    {
      id: 5,
      title: "Color Memory",
      description: "Remember the sequence of colors and repeat them back. Great for training your memory!",
      category: "Memory",
      ageRange: "7-12",
      difficulty: "medium",
      icon: "🌈",
      isPlayable: false
    },
    {
      id: 6,
      title: "Story Builder",
      description: "Create amazing stories by choosing different characters, settings, and plot twists!",
      category: "Creativity",
      ageRange: "8-12",
      difficulty: "medium",
      icon: "📚",
      isPlayable: false
    }
  ];

  const handlePlayGame = (game: Game) => {
    if (game.isPlayable) {
      setSelectedGame(game);
      setGameScreen('playing');
    } else {
      alert(`🎮 "${game.title}" is coming soon! Stay tuned for more amazing games!`);
    }
  };

  const GameCard = ({ game }: { game: Game }) => (
    <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-4xl">{game.icon}</div>
          <div>
            <h4 className="font-bold font-kid text-gray-800 text-lg">
              {game.title}
            </h4>
            <div className="flex items-center space-x-2 text-sm">
              <span className="bg-kid-blue/20 text-kid-blue px-2 py-1 rounded-full text-xs font-bold">
                {game.category}
              </span>
              <span className="text-gray-500 font-kid">Ages {game.ageRange}</span>
            </div>
          </div>
        </div>
        {game.isPlayable && (
          <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
            PLAYABLE
          </div>
        )}
      </div>

      <p className="text-gray-700 font-kid text-sm leading-relaxed mb-4">
        {game.description}
      </p>

      <button
        onClick={() => handlePlayGame(game)}
        className={`w-full p-3 rounded-xl font-bold font-kid transition-all kid-button flex items-center justify-center ${
          game.isPlayable
            ? 'bg-kid-green text-white hover:bg-green-600'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
        }`}
        disabled={!game.isPlayable}
      >
        <Play className="mr-2" size={18} />
        {game.isPlayable ? 'Play Now!' : 'Coming Soon'}
      </button>
    </div>
  );

  // Emoji Charades Game Component
  const EmojiCharadesGame = () => {
    const [currentRound, setCurrentRound] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [showResult, setShowResult] = useState(false);
    const [gameComplete, setGameComplete] = useState(false);

    const rounds = [
      {
        emojis: "🐱🥛",
        question: "What do these emojis represent?",
        options: ["Cat drinking milk", "Pet store", "Farm animals", "Breakfast time"],
        correct: "Cat drinking milk"
      },
      {
        emojis: "🌧️🌈",
        question: "What happens when you see these together?",
        options: ["Storm coming", "Rainbow after rain", "Weather forecast", "Swimming pool"],
        correct: "Rainbow after rain"
      },
      {
        emojis: "📚✏️",
        question: "What activity do these emojis show?",
        options: ["Going to library", "Writing homework", "Reading and writing", "School supplies"],
        correct: "Reading and writing"
      },
      {
        emojis: "🎂🎉",
        question: "What special occasion is this?",
        options: ["Wedding", "Birthday party", "New Year", "Graduation"],
        correct: "Birthday party"
      },
      {
        emojis: "🚀🌙",
        question: "Where is this going?",
        options: ["Space mission to moon", "Airplane flight", "Shooting star", "Fireworks show"],
        correct: "Space mission to moon"
      }
    ];

    const currentQuestion = rounds[currentRound];

    const handleAnswer = (answer: string) => {
      setSelectedAnswer(answer);
      setShowResult(true);
      
      if (answer === currentQuestion.correct) {
        setScore(score + 1);
      }

      setTimeout(() => {
        if (currentRound < rounds.length - 1) {
          setCurrentRound(currentRound + 1);
          setSelectedAnswer('');
          setShowResult(false);
        } else {
          setGameComplete(true);
        }
      }, 2000);
    };

    const resetGame = () => {
      setCurrentRound(0);
      setScore(0);
      setSelectedAnswer('');
      setShowResult(false);
      setGameComplete(false);
    };

    if (gameComplete) {
      return (
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold font-kid text-gray-800 mb-2">
            Great Job, {profile.nickname}!
          </h3>
          <p className="text-xl font-kid text-gray-700 mb-4">
            You scored {score} out of {rounds.length}!
          </p>
          
          <div className="bg-gradient-to-r from-kid-yellow/20 to-kid-orange/20 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="text-yellow-500" size={24} />
              <span className="font-bold font-kid text-gray-800">Achievement Unlocked!</span>
            </div>
            <p className="font-kid text-gray-700">
              {score === rounds.length ? "🌟 Perfect Score Master!" : 
               score >= rounds.length * 0.8 ? "⭐ Emoji Detective!" :
               score >= rounds.length * 0.6 ? "🎯 Good Guesser!" : "🎮 Game Player!"}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={resetGame}
              className="w-full bg-kid-blue text-white p-3 rounded-xl font-bold font-kid kid-button"
            >
              Play Again 🔄
            </button>
            <button
              onClick={() => setGameScreen('menu')}
              className="w-full bg-gray-200 text-gray-700 p-3 rounded-xl font-bold font-kid kid-button"
            >
              Back to Games
            </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Game Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-kid text-gray-600">
              Round {currentRound + 1} of {rounds.length}
            </div>
            <div className="text-sm font-kid text-gray-600">
              Score: {score}/{rounds.length}
            </div>
          </div>
          
          <div className="text-6xl mb-4 animate-bounce-slow">
            {currentQuestion.emojis}
          </div>
          
          <h3 className="text-xl font-bold font-kid text-gray-800 mb-2">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(option)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl font-kid text-left transition-all ${
                showResult
                  ? option === currentQuestion.correct
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : option === selectedAnswer && option !== currentQuestion.correct
                    ? 'bg-red-100 text-red-800 border-2 border-red-300'
                    : 'bg-gray-100 text-gray-500'
                  : 'bg-white border-2 border-gray-200 hover:border-kid-blue hover:bg-blue-50 kid-button'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === currentQuestion.correct && (
                  <Check className="text-green-600" size={20} />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correct && (
                  <X className="text-red-600" size={20} />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Result Message */}
        {showResult && (
          <div className={`text-center p-4 rounded-xl mb-4 ${
            selectedAnswer === currentQuestion.correct
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            <p className="font-bold font-kid">
              {selectedAnswer === currentQuestion.correct 
                ? "🎉 Correct! Great job!" 
                : `🤔 The answer was: ${currentQuestion.correct}`}
            </p>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-kid-blue h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  if (gameScreen === 'playing' && selectedGame) {
    return (
      <div className="h-full bg-gradient-to-br from-kid-sunshine via-kid-coral to-kid-sky p-4">
        <div className="max-w-2xl mx-auto h-full flex flex-col">
          
          {/* Game Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => setGameScreen('menu')}
              className="p-2 hover:bg-white/50 rounded-full transition-colors mr-4"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold font-kid text-gray-800">
                {selectedGame.icon} {selectedGame.title}
              </h1>
              <p className="text-gray-600 font-kid">
                {selectedGame.description}
              </p>
            </div>
          </div>

          {/* Game Content */}
          <div className="flex-1 bg-white/80 rounded-2xl p-6">
            <EmojiCharadesGame />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-kid-sunshine via-kid-coral to-kid-sky p-4">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        
        {/* Removed header - now in top bar */}

        {/* Games Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {mockGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>

        {/* Fun Stats */}
        <div className="mt-6 bg-white/80 rounded-2xl p-4">
          <div className="text-center">
            <h3 className="font-bold font-kid text-gray-800 mb-3">
              🏆 Your Gaming Journey
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold font-kid text-kid-blue">3</div>
                <div className="text-xs font-kid text-gray-600">Games Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-kid text-kid-green">12</div>
                <div className="text-xs font-kid text-gray-600">High Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-kid text-kid-purple">5</div>
                <div className="text-xs font-kid text-gray-600">Achievements</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;