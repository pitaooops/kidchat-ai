import React, { useState } from 'react';
import KidProfileSetup from './components/KidProfileSetup';
import ProfileCreated from './components/ProfileCreated';
import PinSetup from './components/PinSetup';
import MainApp from './components/MainApp';
import ParentDashboard from './components/ParentDashboard';
import { Users, Bot, ArrowLeft } from 'lucide-react';

type ViewMode = 'welcome' | 'profile-setup' | 'profile-created' | 'pin-setup' | 'main-app' | 'parent';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('profile-setup');
  const [kidProfile, setKidProfile] = useState<KidProfile | null>(null);
  const [parentPin, setParentPin] = useState<string>('');

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-kid-yellow via-kid-pink to-kid-blue flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl mb-4 animate-bounce-slow">🤖</h1>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-kid drop-shadow-lg">
          KidChat AI
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-kid">
          A safe, fun AI buddy for kids aged 6-12! 🌟
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Kid Mode */}
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <Bot size={64} className="text-kid-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-kid">
              I'm a Kid! 👶
            </h2>
            <p className="text-gray-600 mb-6 font-kid">
              Chat with your friendly AI buddy! Ask questions, learn new things, and have fun! 🎈
            </p>
            
            {/* Quick Child Selection */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setCurrentView('profile-setup')}
                className="w-full bg-kid-green text-white p-3 rounded-xl font-bold font-kid kid-button text-lg"
              >
                🚀 Let's Get Started!
              </button>
              
              <div className="text-sm text-gray-500 font-kid">
                No signup needed - just start chatting safely!
              </div>
            </div>
          </div>
        </div>

        {/* Parent Mode */}
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
          <div className="text-center">
            <Users size={64} className="text-kid-purple mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4 font-kid">
              I'm a Parent 👨‍👩‍👧‍👦
            </h2>
            <p className="text-gray-600 mb-6 font-kid">
              Monitor your child's learning, set time limits, and ensure safe interactions 🛡️
            </p>
            
            <button
              onClick={() => setCurrentView('parent')}
              className="w-full bg-kid-purple text-white p-3 rounded-xl font-bold font-kid kid-button text-lg mb-4"
            >
              📊 View Dashboard
            </button>
            
            <div className="text-sm text-gray-500 font-kid">
              Demo mode - no login required
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-12 text-center text-white/80">
        <p className="font-kid text-lg mb-4">✨ Features ✨</p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="bg-white/20 px-4 py-2 rounded-full font-kid">🛡️ Kid-Safe Content</span>
          <span className="bg-white/20 px-4 py-2 rounded-full font-kid">🎯 Educational Focus</span>
          <span className="bg-white/20 px-4 py-2 rounded-full font-kid">🎤 Voice Input</span>
          <span className="bg-white/20 px-4 py-2 rounded-full font-kid">📱 iPad Optimized</span>
        </div>
      </div>
    </div>
  );

  const handleProfileCreated = (profile: KidProfile) => {
    setKidProfile(profile);
    setCurrentView('profile-created');
  };

  const handleProfileConfirmed = () => {
    setCurrentView('pin-setup');
  };

  const handlePinSetup = (pin: string) => {
    setParentPin(pin);
    setCurrentView('main-app');
  };

  return (
    <div className="App">
      {currentView === 'welcome' && <WelcomeScreen />}
      
      {currentView === 'profile-setup' && (
        <KidProfileSetup onComplete={handleProfileCreated} />
      )}
      
      {currentView === 'profile-created' && kidProfile && (
        <ProfileCreated 
          profile={kidProfile}
          onContinue={handleProfileConfirmed}
        />
      )}
      
      {currentView === 'pin-setup' && (
        <PinSetup onComplete={handlePinSetup} />
      )}
      
      {currentView === 'main-app' && kidProfile && (
        <MainApp 
          profile={kidProfile}
          parentPin={parentPin}
        />
      )}
      
      {currentView === 'parent' && (
        <div className="relative">
          <button
            onClick={() => setCurrentView('welcome')}
            className="absolute top-4 left-4 z-10 bg-white p-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <ParentDashboard />
        </div>
      )}
    </div>
  );
}

export default App;
