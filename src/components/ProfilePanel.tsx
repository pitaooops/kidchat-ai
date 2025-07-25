import React, { useState } from 'react';
import { X, ChevronRight, MessageCircle, Trophy, Settings, BarChart3, Shield } from 'lucide-react';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface ProfilePanelProps {
  profile: KidProfile;
  parentPin: string;
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ profile, parentPin, onClose }) => {
  const [showPinInput, setShowPinInput] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handleParentAccess = (action: string) => {
    if (enteredPin === parentPin) {
      // In a real app, this would navigate to the respective section
      alert(`Opening ${action}... (Demo mode - PIN verified!)`);
      setShowPinInput(false);
      setEnteredPin('');
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const mockChatHistory = [
    { date: 'Today', topic: '🦕 Learned about dinosaurs', messages: 12 },
    { date: 'Yesterday', topic: '🚀 Explored space rockets', messages: 8 },
    { date: '2 days ago', topic: '🌈 Discovered how rainbows work', messages: 15 },
    { date: '3 days ago', topic: '🐋 Ocean animals adventure', messages: 10 }
  ];

  const mockAchievements = [
    { title: 'Curious Explorer', icon: '🔍', description: 'Asked 50+ questions!' },
    { title: 'Science Enthusiast', icon: '🧪', description: 'Learned about 10 science topics' },
    { title: 'Creative Thinker', icon: '🎨', description: 'Created 3 amazing stories' },
    { title: 'Daily Learner', icon: '📚', description: 'Chatted for 5 days in a row' }
  ];

  const PinInputModal = ({ action, onSubmit, onCancel }: { action: string; onSubmit: () => void; onCancel: () => void }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 m-4 max-w-sm w-full">
        <h3 className="text-lg font-bold font-kid text-gray-800 mb-4 text-center">
          Parent PIN Required 🔒
        </h3>
        <p className="text-gray-600 font-kid text-center mb-4">
          Enter your 4-digit PIN to access {action}
        </p>
        
        <input
          type="password"
          value={enteredPin}
          onChange={(e) => {
            setEnteredPin(e.target.value);
            setPinError('');
          }}
          placeholder="Enter PIN"
          className="w-full p-3 border-2 border-gray-300 rounded-xl text-center text-lg font-bold focus:border-kid-purple focus:outline-none mb-3"
          maxLength={4}
          autoFocus
        />
        
        {pinError && (
          <p className="text-red-500 text-sm font-kid text-center mb-3">
            {pinError}
          </p>
        )}
        
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 p-3 rounded-xl font-bold font-kid"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={enteredPin.length !== 4}
            className="flex-1 bg-kid-purple text-white p-3 rounded-xl font-bold font-kid disabled:opacity-50"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full bg-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold font-kid text-gray-800">Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          
          {/* Profile Info */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-kid-yellow to-kid-pink rounded-2xl flex items-center justify-center text-3xl shadow-lg">
              {profile.avatar}
            </div>
            <div>
              <h3 className="text-2xl font-bold font-kid text-gray-800">
                {profile.nickname}
              </h3>
              <p className="text-gray-600 font-kid">
                {profile.age} years old
              </p>
            </div>
          </div>
          
          {/* Switch Profile Button (Demo - Not functional) */}
          <button
            disabled
            className="w-full mt-4 bg-gray-100 text-gray-400 p-3 rounded-xl font-bold font-kid opacity-60 cursor-not-allowed"
          >
            Switch Profile (Coming Soon)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Chat History Section */}
          <div>
            <div className="flex items-center mb-3">
              <MessageCircle className="text-kid-blue mr-2" size={20} />
              <h4 className="font-bold font-kid text-gray-800">Chat History</h4>
            </div>
            
            <div className="space-y-2">
              {mockChatHistory.map((chat, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold font-kid text-gray-800 text-sm">
                        {chat.topic}
                      </p>
                      <p className="text-xs text-gray-600 font-kid">
                        {chat.date} • {chat.messages} messages
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div>
            <div className="flex items-center mb-3">
              <Trophy className="text-kid-yellow mr-2" size={20} />
              <h4 className="font-bold font-kid text-gray-800">Achievements</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {mockAchievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-kid-yellow/20 to-kid-orange/20 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <h5 className="font-bold font-kid text-gray-800 text-xs mb-1">
                    {achievement.title}
                  </h5>
                  <p className="text-xs text-gray-600 font-kid">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Parent Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-3">
              <Shield className="text-kid-purple mr-2" size={20} />
              <h4 className="font-bold font-kid text-gray-800">For Parents Only</h4>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowPinInput(true)}
                className="w-full bg-kid-purple/10 hover:bg-kid-purple/20 text-kid-purple p-3 rounded-xl font-bold font-kid transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Settings className="mr-2" size={18} />
                  Manage Profile
                </div>
                <ChevronRight size={16} />
              </button>
              
              <button
                onClick={() => setShowPinInput(true)}
                className="w-full bg-kid-green/10 hover:bg-kid-green/20 text-kid-green p-3 rounded-xl font-bold font-kid transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <BarChart3 className="mr-2" size={18} />
                  Kids Dashboard
                </div>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Fun Stats */}
          <div className="bg-gradient-to-r from-kid-blue/10 to-kid-purple/10 rounded-2xl p-4">
            <h4 className="font-bold font-kid text-gray-800 mb-3 text-center">
              Learning Journey 🚀
            </h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold font-kid text-kid-blue">45</div>
                <div className="text-xs font-kid text-gray-600">Questions Asked</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-kid text-kid-green">12</div>
                <div className="text-xs font-kid text-gray-600">Topics Explored</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-kid text-kid-purple">7</div>
                <div className="text-xs font-kid text-gray-600">Days Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Input Modal */}
      {showPinInput && (
        <PinInputModal
          action="parent features"
          onSubmit={() => handleParentAccess('parent dashboard')}
          onCancel={() => {
            setShowPinInput(false);
            setEnteredPin('');
            setPinError('');
          }}
        />
      )}
    </>
  );
};

export default ProfilePanel;