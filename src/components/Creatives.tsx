import React, { useState } from 'react';
import { Plus, Heart, Eye, BookOpen, Palette, Star } from 'lucide-react';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface CreativesProps {
  profile: KidProfile;
}

type ContentType = 'stories' | 'paintings';

const Creatives: React.FC<CreativesProps> = ({ profile }) => {
  const [activeType, setActiveType] = useState<ContentType>('stories');

  // Mock data for stories
  const myStories = [
    {
      id: 1,
      title: "The Magical Dragon Friend",
      preview: "Once upon a time, there was a friendly dragon named Sparkles who loved to help children learn about the stars...",
      author: profile.nickname,
      avatar: profile.avatar,
      createdAt: "2 days ago",
      views: 0,
      likes: 0,
      isOwn: true
    }
  ];

  const publicStories = [
    {
      id: 1,
      title: "The Magical Dragon Friend",
      preview: "Once upon a time, there was a friendly dragon named Sparkles who loved to help children learn about the stars...",
      author: profile.nickname,
      avatar: profile.avatar,
      createdAt: "2 days ago",
      views: 24,
      likes: 8,
      isOwn: true
    },
    {
      id: 2,
      title: "Adventures in the Rainbow Forest",
      preview: "Emma discovered a secret forest where every tree was a different color of the rainbow. Each tree taught her something new...",
      author: "Emma",
      avatar: "👧",
      createdAt: "1 week ago",
      views: 156,
      likes: 32,
      isOwn: false
    },
    {
      id: 3,
      title: "The Robot Who Learned to Paint",
      preview: "Beep-Boop was a robot who wanted to create beautiful art. With the help of his human friends, he discovered...",
      author: "Alex",
      avatar: "👦",
      createdAt: "2 weeks ago",
      views: 203,
      likes: 45,
      isOwn: false
    },
    {
      id: 4,
      title: "Space Cat's First Mission",
      preview: "Captain Whiskers was the first cat astronaut! Join him as he explores the moon and makes friends with aliens...",
      author: "Maya",
      avatar: "🌟",
      createdAt: "3 weeks ago",
      views: 89,
      likes: 19,
      isOwn: false
    }
  ];

  // Mock data for paintings
  const myPaintings = [
    {
      id: 1,
      title: "Sunset Over the Ocean",
      description: "I painted this beautiful sunset with purple and orange colors!",
      author: profile.nickname,
      avatar: profile.avatar,
      createdAt: "1 day ago",
      views: 0,
      likes: 0,
      isOwn: true,
      colors: ["🟠", "🟣", "🔵", "🟡"]
    }
  ];

  const publicPaintings = [
    {
      id: 1,
      title: "Sunset Over the Ocean",
      description: "I painted this beautiful sunset with purple and orange colors!",
      author: profile.nickname,
      avatar: profile.avatar,
      createdAt: "1 day ago",
      views: 12,
      likes: 4,
      isOwn: true,
      colors: ["🟠", "🟣", "🔵", "🟡"]
    },
    {
      id: 2,
      title: "My Pet Dragon",
      description: "This is what I think my pet dragon would look like if I had one!",
      author: "Luna",
      avatar: "🦄",
      createdAt: "4 days ago",
      views: 78,
      likes: 23,
      isOwn: false,
      colors: ["🔴", "🟢", "🟡", "🔵"]
    },
    {
      id: 3,
      title: "Family Portrait",
      description: "I painted my whole family including our dog Buddy!",
      author: "Sam",
      avatar: "🎨",
      createdAt: "1 week ago",
      views: 134,
      likes: 31,
      isOwn: false,
      colors: ["🤎", "🟤", "🟡", "🔴"]
    }
  ];

  const handleCreate = (type: ContentType) => {
    alert(`Creating new ${type === 'stories' ? 'story' : 'painting'}... (Demo mode - this would open the creation tool!)`);
  };

  const StoryCard = ({ story, showStats = false }: { story: any; showStats?: boolean }) => (
    <div className="bg-white rounded-3xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-kid-blue to-kid-cyan rounded-full flex items-center justify-center">
          <BookOpen size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold font-playful text-gray-800 text-sm truncate">
            {story.title}
          </h4>
          <p className="text-xs text-gray-600 font-playful">
            by {story.author} • {story.createdAt}
          </p>
        </div>
        {story.isOwn && (
          <Star className="w-4 h-4 text-kid-yellow fill-current" />
        )}
      </div>
      
      <p className="text-sm text-gray-700 font-playful leading-relaxed mb-3 line-clamp-3">
        {story.preview}
      </p>
      
      {showStats && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {story.views}
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {story.likes}
            </div>
          </div>
          <button className="text-kid-blue hover:text-blue-600 font-bold font-playful">
            Read More
          </button>
        </div>
      )}
    </div>
  );

  const PaintingCard = ({ painting, showStats = false }: { painting: any; showStats?: boolean }) => (
    <div className="bg-white rounded-3xl p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-kid-pink to-kid-purple rounded-full flex items-center justify-center text-lg">
          {painting.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold font-playful text-gray-800 text-sm truncate">
            {painting.title}
          </h4>
          <p className="text-xs text-gray-600 font-playful">
            by {painting.author} • {painting.createdAt}
          </p>
        </div>
        {painting.isOwn && (
          <Star className="w-4 h-4 text-kid-yellow fill-current" />
        )}
      </div>
      
      {/* Mock painting preview */}
      <div className="bg-gradient-to-br from-kid-yellow/20 via-kid-pink/20 to-kid-purple/20 rounded-xl h-24 mb-3 flex items-center justify-center">
        <div className="flex space-x-1">
          {painting.colors.map((color: string, index: number) => (
            <span key={index} className="text-2xl">{color}</span>
          ))}
        </div>
      </div>
      
      <p className="text-sm text-gray-700 font-playful leading-relaxed mb-3">
        {painting.description}
      </p>
      
      {showStats && (
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {painting.views}
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1" />
              {painting.likes}
            </div>
          </div>
          <button className="text-kid-purple hover:text-purple-600 font-bold font-playful">
            View Art
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full bg-gradient-to-br from-kid-peach via-kid-lavender to-kid-mint">
      <div className="max-w-6xl mx-auto h-full flex flex-col px-6 pt-6">
        
        {/* Type Selector - Compact buttons - Fixed height */}
        <div className="flex bg-white/80 rounded-2xl p-1.5 mb-6 max-w-2xl mx-auto shadow-lg" style={{ height: '52px' }}>
          <button
            onClick={() => setActiveType('stories')}
            className={`flex-1 flex items-center justify-center space-x-3 py-2.5 px-4 rounded-2xl font-bold font-playful transition-all text-lg ${
              activeType === 'stories'
                ? 'bg-gradient-to-r from-kid-blue to-kid-cyan text-white shadow-md transform scale-[1.02]'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <BookOpen size={22} />
            <span>Stories</span>
          </button>
          <button
            onClick={() => setActiveType('paintings')}
            className={`flex-1 flex items-center justify-center space-x-3 py-2.5 px-4 rounded-2xl font-bold font-playful transition-all text-lg ${
              activeType === 'paintings'
                ? 'bg-gradient-to-r from-kid-purple to-kid-pink text-white shadow-md transform scale-[1.02]'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <Palette size={22} />
            <span>Paintings</span>
          </button>
        </div>

        {/* Content - Calculated height to prevent cutoff */}
        <div 
          className="overflow-y-auto px-2"
          style={{ 
            height: 'calc(100vh - 200px)', // Screen minus top bar (80px) + tab switcher (58px) + bottom nav (80px) + padding
            maxHeight: 'calc(100vh - 200px)'
          }}
        >
          {activeType === 'stories' ? (
            <div className="space-y-6 pb-12">
              {/* Create Button */}
              <button
                onClick={() => handleCreate('stories')}
                className="w-full bg-gradient-to-r from-kid-blue to-kid-purple text-white p-8 rounded-3xl font-bold text-xl font-playful kid-button flex items-center justify-center shadow-2xl"
              >
                <Plus className="mr-3" size={32} />
                Create New Story ✨
              </button>

              {/* My Stories */}
              <div>
                <h2 className="text-xl font-bold font-playful text-gray-800 mb-3 flex items-center">
                  <BookOpen className="mr-2 text-kid-blue" size={20} />
                  My Stories ({myStories.length})
                </h2>
                <div className="grid gap-4">
                  {myStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              </div>

              {/* Public Stories */}
              <div className="mb-6">
                <h2 className="text-xl font-bold font-playful text-gray-800 mb-3 flex items-center">
                  <Star className="mr-2 text-kid-yellow" size={20} />
                  Stories by Other Kids ({publicStories.length})
                </h2>
                <div className="grid gap-4">
                  {publicStories.map((story) => (
                    <StoryCard key={story.id} story={story} showStats />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-12">
              {/* Create Button */}
              <button
                onClick={() => handleCreate('paintings')}
                className="w-full bg-gradient-to-r from-kid-pink to-kid-orange text-white p-8 rounded-3xl font-bold text-xl font-playful kid-button flex items-center justify-center shadow-2xl"
              >
                <Plus className="mr-3" size={32} />
                Create New Painting 🎨
              </button>

              {/* My Paintings */}
              <div>
                <h2 className="text-xl font-bold font-playful text-gray-800 mb-3 flex items-center">
                  <Palette className="mr-2 text-kid-purple" size={20} />
                  My Paintings ({myPaintings.length})
                </h2>
                <div className="grid gap-4">
                  {myPaintings.map((painting) => (
                    <PaintingCard key={painting.id} painting={painting} />
                  ))}
                </div>
              </div>

              {/* Public Paintings */}
              <div className="mb-6">
                <h2 className="text-xl font-bold font-playful text-gray-800 mb-3 flex items-center">
                  <Star className="mr-2 text-kid-yellow" size={20} />
                  Paintings by Other Kids ({publicPaintings.length})
                </h2>
                <div className="grid gap-4">
                  {publicPaintings.map((painting) => (
                    <PaintingCard key={painting.id} painting={painting} showStats />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Creatives;