import React, { useState, useEffect, useCallback } from 'react';
import { Clock, MessageCircle, TrendingUp, Shield, Settings, User } from 'lucide-react';

interface Child {
  id: number;
  name: string;
  age: number;
  avatar: string;
}

interface UsageStats {
  dailyStats: Array<{
    date: string;
    messages_sent: number;
    session_duration: number;
    topics_explored: string;
  }>;
  totalSessions: number;
  summary: {
    totalMessages: number;
    totalDuration: number;
    daysActive: number;
  };
}

const ParentDashboard: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [usageStats, setUsageStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsageStats = useCallback(async (childId: number) => {
    setIsLoading(true);
    try {
      // Mock data for demo - in real app this would fetch from API
      const mockStats: UsageStats = {
        dailyStats: [
          { date: '2024-01-20', messages_sent: 15, session_duration: 1200, topics_explored: 'Animals, Space' },
          { date: '2024-01-21', messages_sent: 22, session_duration: 1800, topics_explored: 'Math, Colors' },
          { date: '2024-01-22', messages_sent: 18, session_duration: 1400, topics_explored: 'Science, Art' },
          { date: '2024-01-23', messages_sent: 12, session_duration: 900, topics_explored: 'Music, Animals' },
          { date: '2024-01-24', messages_sent: 25, session_duration: 2000, topics_explored: 'Space, Dinosaurs' }
        ],
        totalSessions: 12,
        summary: {
          totalMessages: 92,
          totalDuration: 7300,
          daysActive: 5
        }
      };
      setUsageStats(mockStats);
    } catch (error) {
      console.error('Failed to fetch usage stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mock data for demo
  useEffect(() => {
    // Simulate children data
    setChildren([
      { id: 1, name: "Emma", age: 8, avatar: "👧" },
      { id: 2, name: "Alex", age: 10, avatar: "👦" }
    ]);
    
    if (children.length > 0) {
      setSelectedChild(children[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedChild) {
      fetchUsageStats(selectedChild.id);
    }
  }, [selectedChild, fetchUsageStats]);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const SafetyFeatures = () => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <Shield className="text-green-500 mr-2" size={24} />
        <h3 className="text-xl font-bold text-gray-800">Safety Features</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="font-medium">Content Filtering</span>
          <span className="text-green-600 font-bold">✓ Active</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="font-medium">Age-Appropriate Responses</span>
          <span className="text-green-600 font-bold">✓ Active</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="font-medium">Educational Focus</span>
          <span className="text-green-600 font-bold">✓ Active</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="font-medium">Daily Time Limit</span>
          <select className="bg-white border rounded px-2 py-1">
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-cream to-kid-lavender p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Parent Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor your child's learning journey</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <Settings size={20} className="inline mr-2" />
              Settings
            </button>
          </div>
        </div>

        {/* Child Selector */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Select Child</h2>
          <div className="flex space-x-4">
            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  selectedChild?.id === child.id
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="text-2xl">{child.avatar}</span>
                <div className="text-left">
                  <p className="font-bold">{child.name}</p>
                  <p className="text-sm text-gray-600">Age {child.age}</p>
                </div>
              </button>
            ))}
            <button className="flex items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
              <User size={24} className="text-gray-400" />
              <span className="ml-2 text-gray-600">Add Child</span>
            </button>
          </div>
        </div>

        {selectedChild && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Usage Statistics */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center">
                    <MessageCircle className="text-blue-500 mr-3" size={24} />
                    <div>
                      <p className="text-gray-600 text-sm">Total Messages</p>
                      <p className="text-2xl font-bold">{usageStats?.summary.totalMessages || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center">
                    <Clock className="text-green-500 mr-3" size={24} />
                    <div>
                      <p className="text-gray-600 text-sm">Total Time</p>
                      <p className="text-2xl font-bold">
                        {formatDuration(usageStats?.summary.totalDuration || 0)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center">
                    <TrendingUp className="text-purple-500 mr-3" size={24} />
                    <div>
                      <p className="text-gray-600 text-sm">Active Days</p>
                      <p className="text-2xl font-bold">{usageStats?.summary.daysActive || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {usageStats?.dailyStats.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">Topics: {day.topics_explored}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{day.messages_sent} messages</p>
                          <p className="text-sm text-gray-600">{formatDuration(day.session_duration)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Safety Panel */}
            <div className="space-y-6">
              <SafetyFeatures />
              
              {/* Learning Progress */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Learning Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Curiosity Level</span>
                      <span className="text-sm font-bold">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Engagement</span>
                      <span className="text-sm font-bold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Learning Variety</span>
                      <span className="text-sm font-bold">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;