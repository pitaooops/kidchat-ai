import React, { useState } from 'react';
import { MessageCircle, Palette, Target, Gamepad2, Menu } from 'lucide-react';
import EnhancedChat from './EnhancedChat';
import Creatives from './Creatives';
import Quests from './Quests';
import Games from './Games';
import ProfilePanel from './ProfilePanel';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface MainAppProps {
  profile: KidProfile;
  parentPin: string;
}

type TabType = 'chat' | 'creatives' | 'quests' | 'games';

const MainApp: React.FC<MainAppProps> = ({ profile, parentPin }) => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [showProfilePanel, setShowProfilePanel] = useState(false);

  const getTopBarContent = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    
    // Mock quest progress data (same as in Quests component)
    const completedQuests = 1; // Math Wizard completed
    const totalQuests = 6;
    
    switch (activeTab) {
      case 'chat':
        return {
          main: `Happy ${today}, ${profile.nickname}! 👋`,
          sub: 'Ready for adventure? ✨'
        };
      case 'creatives':
        return {
          main: 'Creative Studio',
          sub: 'Create amazing stories and paintings with AI magic! ✨'
        };
      case 'quests':
        return {
          main: 'Quests',
          sub: `Embark on exciting learning adventures, ${profile.nickname}! ✨`,
          progress: { completed: completedQuests, total: totalQuests }
        };
      case 'games':
        return {
          main: 'Games',
          sub: `Play amazing games while learning new things, ${profile.nickname}! 🎯`
        };
      default:
        return {
          main: `Happy ${today}, ${profile.nickname}! 👋`,
          sub: 'Ready for adventure? ✨'
        };
    }
  };

  const tabs = [
    { id: 'chat' as TabType, label: 'Chat', icon: MessageCircle, color: 'kid-blue' },
    { id: 'creatives' as TabType, label: 'Creatives', icon: Palette, color: 'kid-pink' },
    { id: 'quests' as TabType, label: 'Quests', icon: Target, color: 'kid-green' },
    { id: 'games' as TabType, label: 'Games', icon: Gamepad2, color: 'kid-purple' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <EnhancedChat profile={profile} />;
      case 'creatives':
        return <Creatives profile={profile} />;
      case 'quests':
        return <Quests profile={profile} />;
      case 'games':
        return <Games profile={profile} />;
      default:
        return <EnhancedChat profile={profile} />;
    }
  };

  return (
    <div className="tablet-container flex flex-col h-screen bg-gradient-to-br from-kid-sunshine via-kid-coral to-kid-sky">
      {/* Top Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg p-4 relative z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {/* Profile Section */}
          <button
            onClick={() => setShowProfilePanel(true)}
            className="flex items-center space-x-4 p-2 hover:bg-white/50 transition-colors"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-kid-sunshine to-kid-coral rounded-full flex items-center justify-center text-2xl shadow-lg">
              {profile.avatar}
            </div>
            <div className="text-left">
              <h2 className="font-bold font-playful text-gray-800 text-lg">
                {getTopBarContent().main}
              </h2>
              <p className="text-sm text-gray-600 font-playful font-medium">
                {getTopBarContent().sub}
              </p>
            </div>
          </button>

          {/* Right Section - Progress or Menu */}
          {activeTab === 'quests' && getTopBarContent().progress ? (
            <div className="bg-white/80 rounded-2xl p-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs font-playful text-gray-600">Progress</div>
                  <div className="text-sm font-bold font-playful text-gray-800">
                    {getTopBarContent().progress?.completed}/{getTopBarContent().progress?.total} completed
                  </div>
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-kid-green to-kid-blue h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((getTopBarContent().progress?.completed || 0) / (getTopBarContent().progress?.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowProfilePanel(true)}
              className="md:hidden p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white/95 backdrop-blur-sm border-t border-white/50 p-3">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-around gap-4">
            {tabs.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center space-y-1 p-3 transition-all ${
                  activeTab === id
                    ? ''
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon 
                  size={24} 
                  className={activeTab === id ? `text-${color}` : 'text-gray-600'}
                />
                <span className={`text-sm font-bold font-playful ${
                  activeTab === id ? `text-${color}` : 'text-gray-600'
                }`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Panel Overlay */}
      {showProfilePanel && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setShowProfilePanel(false)}
          />
          
          {/* Panel */}
          <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform">
            <ProfilePanel 
              profile={profile}
              parentPin={parentPin}
              onClose={() => setShowProfilePanel(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainApp;