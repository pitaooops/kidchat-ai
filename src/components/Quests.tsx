import React, { useState } from 'react';
import { Target, Star, Clock, Trophy, ChevronRight, Play } from 'lucide-react';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface QuestsProps {
  profile: KidProfile;
}

interface Quest {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  reward: string;
  icon: string;
  progress: number;
  isCompleted: boolean;
  isActive: boolean;
}

const Quests: React.FC<QuestsProps> = ({ profile }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mockQuests: Quest[] = [
    {
      id: 1,
      title: "Animal Explorer",
      description: "Learn about 5 different animals and their habitats. Discover what makes each one special!",
      category: "Nature",
      difficulty: "easy",
      duration: "15 mins",
      reward: "🦁 Animal Expert Badge",
      icon: "🐾",
      progress: 60,
      isCompleted: false,
      isActive: true
    },
    {
      id: 2,
      title: "Space Detective",
      description: "Investigate the mysteries of our solar system. Learn about planets, moons, and stars!",
      category: "Science",
      difficulty: "medium",
      duration: "20 mins",
      reward: "🚀 Space Explorer Badge",
      icon: "🌌",
      progress: 0,
      isCompleted: false,
      isActive: false
    },
    {
      id: 3,
      title: "Math Wizard",
      description: "Solve fun number puzzles and discover the magic of mathematics in everyday life!",
      category: "Math",
      difficulty: "medium",
      duration: "25 mins",
      reward: "🧙‍♂️ Math Wizard Badge",
      icon: "🔢",
      progress: 100,
      isCompleted: true,
      isActive: false
    },
    {
      id: 4,
      title: "Story Creator",
      description: "Write an amazing adventure story with magical characters and exciting plot twists!",
      category: "Creativity",
      difficulty: "hard",
      duration: "30 mins",
      reward: "📚 Master Storyteller Badge",
      icon: "✍️",
      progress: 25,
      isCompleted: false,
      isActive: false
    },
    {
      id: 5,
      title: "Ocean Adventure",
      description: "Dive deep into the ocean and meet incredible sea creatures from tiny fish to giant whales!",
      category: "Nature",
      difficulty: "easy",
      duration: "18 mins",
      reward: "🐋 Ocean Explorer Badge",
      icon: "🌊",
      progress: 0,
      isCompleted: false,
      isActive: false
    },
    {
      id: 6,
      title: "Color Artist",
      description: "Learn about colors, how they mix, and create beautiful artworks using the color wheel!",
      category: "Art",
      difficulty: "easy",
      duration: "20 mins",
      reward: "🎨 Color Master Badge",
      icon: "🌈",
      progress: 80,
      isCompleted: false,
      isActive: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Quests', icon: '🎯' },
    { id: 'Nature', name: 'Nature', icon: '🌿' },
    { id: 'Science', name: 'Science', icon: '🔬' },
    { id: 'Math', name: 'Math', icon: '🔢' },
    { id: 'Creativity', name: 'Creativity', icon: '✨' },
    { id: 'Art', name: 'Art', icon: '🎨' }
  ];

  const filteredQuests = selectedCategory === 'all' 
    ? mockQuests 
    : mockQuests.filter(quest => quest.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleStartQuest = (quest: Quest) => {
    if (quest.isCompleted) {
      alert(`🎉 Quest "${quest.title}" already completed! You earned: ${quest.reward}`);
    } else if (quest.isActive) {
      alert(`📖 Continuing quest "${quest.title}"... (Demo mode - this would open the quest interface!)`);
    } else {
      alert(`🚀 Starting quest "${quest.title}"... (Demo mode - this would begin the learning adventure!)`);
    }
  };

  const QuestCard = ({ quest }: { quest: Quest }) => (
    <div className={`bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all ${
      quest.isActive ? 'ring-2 ring-kid-blue/30 bg-blue-50/30' : ''
    } ${quest.isCompleted ? 'opacity-75' : ''}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{quest.icon}</div>
          <div>
            <h4 className="font-bold font-kid text-gray-800 text-lg flex items-center">
              {quest.title}
              {quest.isCompleted && <Trophy className="ml-2 w-4 h-4 text-yellow-500" />}
              {quest.isActive && <Star className="ml-2 w-4 h-4 text-blue-500" />}
            </h4>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(quest.difficulty)}`}>
                {quest.difficulty.toUpperCase()}
              </span>
              <div className="flex items-center text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {quest.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 font-kid text-sm leading-relaxed mb-4">
        {quest.description}
      </p>

      {/* Progress Bar (if started) */}
      {quest.progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-xs font-kid text-gray-600 mb-1">
            <span>Progress</span>
            <span>{quest.progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                quest.isCompleted ? 'bg-green-500' : 'bg-kid-blue'
              }`}
              style={{ width: `${quest.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Reward */}
      <div className="bg-gradient-to-r from-kid-yellow/20 to-kid-orange/20 rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-kid text-gray-600 mb-1">Quest Reward</p>
            <p className="font-bold font-kid text-gray-800">{quest.reward}</p>
          </div>
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => handleStartQuest(quest)}
        className={`w-full p-3 rounded-xl font-bold font-kid transition-all kid-button flex items-center justify-center ${
          quest.isCompleted
            ? 'bg-green-100 text-green-700'
            : quest.isActive
            ? 'bg-kid-blue text-white'
            : 'bg-kid-purple text-white'
        }`}
      >
        {quest.isCompleted ? (
          <>
            <Trophy className="mr-2" size={18} />
            Quest Completed!
          </>
        ) : quest.isActive ? (
          <>
            <Play className="mr-2" size={18} />
            Continue Quest
          </>
        ) : (
          <>
            <Target className="mr-2" size={18} />
            Start Quest
          </>
        )}
        <ChevronRight className="ml-2" size={16} />
      </button>
    </div>
  );

  const completedQuests = mockQuests.filter(q => q.isCompleted).length;
  const totalQuests = mockQuests.length;

  return (
    <div className="h-full bg-gradient-to-br from-kid-sunshine via-kid-coral to-kid-mint p-4">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        
        {/* Progress indicator moved to top bar */}

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold font-kid transition-all kid-button ${
                  selectedCategory === category.id
                    ? 'bg-kid-purple text-white transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quests Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
          
          {filteredQuests.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold font-kid text-gray-600 mb-2">
                No quests found
              </h3>
              <p className="text-gray-500 font-kid">
                Try selecting a different category!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quests;