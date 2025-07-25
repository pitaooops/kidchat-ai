import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface KidProfileSetupProps {
  onComplete: (profile: KidProfile) => void;
}

const KidProfileSetup: React.FC<KidProfileSetupProps> = ({ onComplete }) => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl' | 'other'>('boy');
  const [age, setAge] = useState(8);

  const avatars = {
    boy: ['👦', '🧒', '👶', '🎯', '⚽', '🚀', '🦖', '🤖'],
    girl: ['👧', '🧒', '👶', '🌸', '🦄', '🌈', '🎨', '⭐'],
    other: ['🧒', '👶', '🌟', '🎈', '🎭', '🎪', '🎵', '🌺']
  };

  const selectedAvatar = avatars[gender][0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onComplete({
        nickname: nickname.trim(),
        gender,
        age,
        avatar: selectedAvatar
      });
    }
  };

  return (
    <div className="tablet-container h-screen bg-gradient-to-br from-kid-sunshine via-kid-coral to-kid-mint flex flex-col items-center justify-center p-8">
      {/* Progress Bar */}
      <ProgressBar 
        currentStep={1} 
        totalSteps={3} 
        stepLabels={['Create Profile', 'Confirm Details', 'Setup PIN']} 
      />
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl w-full shadow-2xl">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6 animate-bounce-slow">{selectedAvatar}</div>
          <h1 className="text-5xl font-bold text-gray-800 font-kid mb-4">
            Create Your Profile
          </h1>
          <p className="text-xl text-gray-600 font-kid">
            Let's set up your amazing adventure! 🌟
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Nickname Input */}
          <div>
            <label className="block text-2xl font-bold text-gray-700 mb-4 font-kid">
              What should we call you? 😊
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your awesome nickname..."
              className="w-full p-6 playful-input text-2xl font-kid focus:outline-none"
              maxLength={20}
              required
            />
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-2xl font-bold text-gray-700 mb-4 font-kid">
              I am a... 🤔
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'boy' as const, label: 'Boy', emoji: '👦' },
                { value: 'girl' as const, label: 'Girl', emoji: '👧' },
                { value: 'other' as const, label: 'Other', emoji: '🧒' }
              ].map(({ value, label, emoji }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setGender(value)}
                  className={`p-6 rounded-2xl font-bold font-kid transition-all kid-button text-xl ${
                    gender === value
                      ? 'bg-gradient-to-r from-kid-purple to-kid-pink text-white transform scale-105 animate-wiggle'
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  <div className="text-4xl mb-2">{emoji}</div>
                  <div>{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Age Selection */}
          <div>
            <label className="block text-2xl font-bold text-gray-700 mb-4 font-kid">
              How old are you? 🎂
            </label>
            <div className="flex items-center justify-center space-x-6">
              <button
                type="button"
                onClick={() => setAge(Math.max(6, age - 1))}
                className="w-16 h-16 bg-gradient-to-r from-kid-blue to-kid-cyan text-white rounded-full font-bold text-2xl kid-button large-touch-target disabled:opacity-50"
                disabled={age <= 6}
              >
                -
              </button>
              
              <div className="bg-gradient-to-r from-kid-yellow/30 to-kid-orange/30 px-8 py-6 rounded-3xl">
                <span className="text-5xl font-bold font-kid animate-pulse">{age}</span>
                <span className="text-2xl font-kid ml-3">years old</span>
              </div>
              
              <button
                type="button"
                onClick={() => setAge(Math.min(12, age + 1))}
                className="w-16 h-16 bg-gradient-to-r from-kid-blue to-kid-cyan text-white rounded-full font-bold text-2xl kid-button large-touch-target disabled:opacity-50"
                disabled={age >= 12}
              >
                +
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!nickname.trim()}
            className="w-full bg-gradient-to-r from-kid-green to-kid-lime text-white p-6 rounded-3xl font-bold text-2xl font-kid kid-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center large-touch-target shadow-2xl"
          >
            Create My Awesome Profile! ✨
            <ArrowRight className="ml-3" size={28} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default KidProfileSetup;