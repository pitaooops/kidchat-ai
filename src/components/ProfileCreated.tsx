import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface ProfileCreatedProps {
  profile: KidProfile;
  onContinue: () => void;
}

const ProfileCreated: React.FC<ProfileCreatedProps> = ({ profile, onContinue }) => {
  return (
    <div className="tablet-container min-h-screen bg-gradient-to-br from-kid-yellow via-kid-pink to-kid-blue flex flex-col items-center justify-center p-8">
      {/* Progress Bar */}
      <ProgressBar 
        currentStep={2} 
        totalSteps={3} 
        stepLabels={['Create Profile', 'Confirm Details', 'Setup PIN']} 
      />
      
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 max-w-3xl w-full shadow-2xl">
        
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce-slow">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 font-kid mb-2">
            Profile Created!
          </h1>
          <p className="text-gray-600 font-kid">
            Welcome to KidChat AI, {profile.nickname}! 🌟
          </p>
        </div>

        {/* Created Profile Display */}
        <div className="bg-gradient-to-r from-kid-blue/20 to-kid-purple/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">{profile.avatar}</div>
            <div>
              <h3 className="text-2xl font-bold font-kid text-gray-800">
                {profile.nickname}
              </h3>
              <p className="text-gray-600 font-kid">
                {profile.age} years old • {profile.gender === 'boy' ? 'Boy' : profile.gender === 'girl' ? 'Girl' : 'Kid'}
              </p>
            </div>
          </div>
        </div>

        {/* Add More Profiles Section */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4 font-kid">
            Family Profiles
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Current Profile */}
            <div className="bg-kid-green/20 border-2 border-kid-green/30 rounded-xl p-3">
              <div className="text-center">
                <div className="text-2xl mb-1">{profile.avatar}</div>
                <div className="text-sm font-bold font-kid text-gray-700">
                  {profile.nickname}
                </div>
              </div>
            </div>

            {/* Add Profile Button (Demo - Not Clickable) */}
            <button
              disabled
              className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-3 opacity-60 cursor-not-allowed"
              title="Feature coming soon!"
            >
              <div className="text-center">
                <Plus className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <div className="text-sm font-bold font-kid text-gray-400">
                  Add Profile
                </div>
              </div>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-2 font-kid">
            * Multiple profiles feature coming soon! 
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full bg-kid-purple text-white p-4 rounded-2xl font-bold text-lg font-kid kid-button flex items-center justify-center"
        >
          Continue to PIN Setup
          <ArrowRight className="ml-2" size={20} />
        </button>

        {/* Fun Facts */}
        <div className="mt-6 bg-kid-yellow/20 rounded-2xl p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-bold font-kid text-gray-700 mb-1">
              Did you know?
            </h4>
            <p className="text-sm font-kid text-gray-600">
              Kids your age ask about 300 questions per day! I'm excited to answer yours! 🤔✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreated;