import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2 } from 'lucide-react';

interface KidProfile {
  nickname: string;
  gender: 'boy' | 'girl' | 'other';
  age: number;
  avatar: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

interface EnhancedChatProps {
  profile: KidProfile;
}

// Define helper functions first
const getTopicSuggestions = (): string[] => {
  const topics = [
    "🦕 Tell me about dinosaurs!",
    "🚀 How do rockets work?",
    "🌈 What makes rainbows appear?",
    "🐋 What's the biggest animal?",
    "⭐ Are there aliens in space?",
    "🎨 How do artists make colors?",
    "🦋 How do caterpillars become butterflies?",
    "🏰 Tell me about castles and knights!",
    "🌊 What lives in the deepest ocean?",
    "🎵 How does music make us happy?"
  ];
  
  // Return 3 random topics
  const shuffled = topics.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

const EnhancedChat: React.FC<EnhancedChatProps> = ({ profile }) => {
  // Initialize with welcome message immediately
  const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const initialMessage: Message = {
    id: 'onboarding',
    role: 'assistant',
    content: `Happy ${day}, ${profile.nickname}! 🌟 What would you like to talk about today? I have some fun ideas:`,
    timestamp: new Date().toISOString(),
    suggestions: getTopicSuggestions()
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNewSession, setIsNewSession] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(getTopicSuggestions());
  const [currentlyPlayingMessageId, setCurrentlyPlayingMessageId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Scroll to TOP on component mount to show first message
  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = 0;
    }
  }, []);

  // Scroll to bottom when new messages arrive (but not initial load)
  useEffect(() => {
    if (messages.length > 1) { // Only scroll down after first message
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getConversationPrompts = (topic: string): string[] => {
    const prompts = [
      "Tell me more! 🤔",
      "That's so cool! What else? ✨",
      "I want to learn more! 📚",
      "What happens next? 🎯",
      "How does that work? ⚙️",
      "That's amazing! Show me more! 🌟"
    ];
    
    // Return 2-3 random prompts
    const shuffled = prompts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
  };

  const generateMockResponse = (message: string): { response: string; suggestions: string[] } => {
    const lowerMessage = message.toLowerCase();
    
    // Dinosaurs
    if (lowerMessage.includes('dinosaur')) {
      return {
        response: "Dinosaurs were amazing creatures that lived millions of years ago! 🦕 The biggest one was the Argentinosaurus - it was as long as three school buses! Some dinosaurs ate plants and some ate meat. Did you know some dinosaurs had feathers like birds? They came in all shapes and sizes!",
        suggestions: ["What did T-Rex eat? 🦖", "How big were dinosaur eggs? 🥚", "Why did dinosaurs disappear? 🤔"]
      };
    }
    
    // Space/Rockets
    if (lowerMessage.includes('rocket') || lowerMessage.includes('space')) {
      return {
        response: "Rockets are super cool! 🚀 They work by shooting hot gas out the bottom really fast, which pushes the rocket up into space! It's like when you blow up a balloon and let it go - it flies around! Rockets need to go 17,500 mph to stay in space. That's really, really fast!",
        suggestions: ["How far is the moon? 🌙", "What do astronauts eat? 👨‍🚀", "Are there other planets like Earth? 🌍"]
      };
    }
    
    // Rainbows
    if (lowerMessage.includes('rainbow')) {
      return {
        response: "Rainbows are nature's magic! 🌈 They happen when sunlight shines through tiny water droplets in the air, like after it rains. The sunlight breaks into all its hidden colors - red, orange, yellow, green, blue, indigo, and violet! You can sometimes make mini rainbows with a garden hose on a sunny day!",
        suggestions: ["Why are there 7 colors? 🎨", "Can I touch a rainbow? ✋", "Do rainbows have gold at the end? 💰"]
      };
    }
    
    // Animals
    if (lowerMessage.includes('animal') || lowerMessage.includes('whale') || lowerMessage.includes('elephant')) {
      return {
        response: "Animals are incredible! 🐋 The blue whale is the biggest animal ever - even bigger than dinosaurs! Their hearts are as big as a car! Animals have amazing superpowers - some can see colors we can't, others can hear sounds we can't hear, and some can even sense earthquakes before they happen! 🐾",
        suggestions: ["What's the fastest animal? 🏃‍♂️", "Do animals dream? 💭", "Which animal is the smartest? 🧠"]
      };
    }
    
    // Default responses
    const defaultResponses = [
      {
        response: "That's such a great question! 🌟 I love how curious you are! Learning new things is like going on an adventure - there's always something amazing to discover. What made you think of that?",
        suggestions: ["Tell me about adventures! 🗺️", "What's your favorite thing? ❤️", "Let's explore something new! 🔍"]
      },
      {
        response: "Wow, you're such a smart kid! ✨ Did you know that asking questions is how we learn the most? Scientists, artists, and inventors all started just like you - by being curious about everything around them!",
        suggestions: ["What do scientists do? 🔬", "How do inventions help people? 💡", "What can I create? 🎨"]
      },
      {
        response: "That's so interesting! 🤔 You know what's really cool? Every day we can learn something that makes us go 'WOW!' - just like you made me think right now! Keep asking questions, that's how we discover amazing things!",
        suggestions: ["What makes you say wow? 😮", "Tell me a fun fact! 📖", "What should we discover next? 🚀"]
      }
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async (messageText: string = inputText) => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const { response, suggestions } = generateMockResponse(messageText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      
      // Delay suggestions to appear after speech bubble animation completes
      setTimeout(() => {
        setCurrentSuggestions(suggestions);
      }, 800); // Wait for speech bubble animation to complete
      
      // Speak the response with proper tracking
      speakText(response, aiMessage.id);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const speakText = (text: string, messageId?: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        if (messageId) setCurrentlyPlayingMessageId(messageId);
      };
      
      utterance.onend = () => {
        setCurrentlyPlayingMessageId(null);
        currentUtterance.current = null;
      };
      
      currentUtterance.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleVoicePlayback = (text: string, messageId: string) => {
    if ('speechSynthesis' in window) {
      // If this message is currently playing, stop it immediately
      if (currentlyPlayingMessageId === messageId) {
        speechSynthesis.cancel(); // This should stop immediately
        setCurrentlyPlayingMessageId(null);
        currentUtterance.current = null;
        return;
      }
      
      // If another message is playing, stop it first
      if (currentlyPlayingMessageId || speechSynthesis.speaking) {
        speechSynthesis.cancel();
        setCurrentlyPlayingMessageId(null);
        currentUtterance.current = null;
      }
      
      // Start playing this message
      speakText(text, messageId);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-kid-sunshine via-kid-mint to-kid-sky">
      {/* Messages Container - Fixed Height, Scrollable */}
      <div 
        className="messages-container flex-1 overflow-y-auto px-6 pt-6 pb-2"
        style={{ 
          height: 'calc(100vh - 160px)', // Total height minus top bar (80px) and bottom nav (80px) 
          maxHeight: 'calc(100vh - 160px)'
        }}
      >
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Top padding to ensure first message is visible */}
          <div className="h-4"></div>
          
          {messages.length === 0 && (
            <div className="text-center text-gray-500 font-playful">
              Loading welcome message...
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-md p-4 rounded-3xl speech-bubble relative ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-kid-blue to-kid-cyan text-white'
                    : 'bg-white text-gray-800 shadow-lg'
                }`}
              >
                {message.role === 'assistant' && (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">🤖</span>
                        <span className="font-bold text-kid-purple font-playful text-lg">KidBot</span>
                      </div>
                      <button
                        onClick={() => toggleVoicePlayback(message.content, message.id)}
                        className={`p-1 hover:bg-kid-purple/10 rounded-full transition-colors ${
                          currentlyPlayingMessageId === message.id ? 'bg-kid-purple/20' : ''
                        }`}
                        title={currentlyPlayingMessageId === message.id ? "Stop audio" : "Play audio"}
                      >
                        <Volume2 
                          size={16} 
                          className={`${
                            currentlyPlayingMessageId === message.id 
                              ? 'text-kid-purple animate-pulse' 
                              : 'text-kid-purple'
                          }`} 
                        />
                      </button>
                    </div>
                  </>
                )}
                <p className="text-lg font-playful leading-relaxed font-medium">{message.content}</p>
              </div>
            </div>
          ))}
          
          {/* Show current suggestions if available */}
          {!isLoading && currentSuggestions.length > 0 && (
            <div className="flex justify-end">
              <div className="max-w-md space-y-2">
                {currentSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      sendMessage(suggestion);
                      setCurrentSuggestions([]);
                    }}
                    className="block w-full bg-gradient-to-r from-kid-sunshine to-kid-peach hover:from-kid-yellow hover:to-kid-orange text-gray-800 p-3 rounded-3xl text-left font-playful shadow-md text-sm font-medium"
                    disabled={isLoading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-3xl shadow-lg speech-bubble">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🤖</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-kid-purple rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-kid-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-3 h-3 bg-kid-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Bottom padding to ensure messages don't get cut off */}
          <div className="h-20"></div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input Bar at Bottom */}
      <div className="bg-white/95 backdrop-blur-md border-t border-kid-purple/20 p-4 shadow-2xl" style={{ height: '80px' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            {/* Text Input Box - Left Side */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-gradient-to-r from-kid-sky/30 to-kid-mint/30 border-2 border-kid-blue/30 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:border-kid-purple focus:ring-2 focus:ring-kid-purple/20 font-playful text-lg shadow-lg"
                disabled={isLoading}
              />
            </div>
            
            {/* Microphone Button - Right Side */}
            <button
              onClick={startListening}
              disabled={isLoading || isListening}
              className={`p-3 rounded-2xl transition-all duration-200 shadow-lg font-playful ${
                isListening 
                  ? 'bg-gradient-to-r from-red-400 to-red-500 animate-pulse scale-110' 
                  : 'bg-gradient-to-r from-kid-coral to-kid-pink hover:scale-105 hover:shadow-xl'
              } text-white border-2 border-white/50`}
              title="Voice input"
            >
              <Mic size={20} />
            </button>

            {/* Send Button - Right Side */}
            <button
              onClick={() => sendMessage()}
              disabled={!inputText.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-kid-blue to-kid-cyan text-white rounded-2xl hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/50"
              title="Send message"
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* Listening Indicator */}
          {isListening && (
            <div className="mt-1 text-center animate-pulse">
              <p className="text-kid-purple font-bold font-playful text-xs">
                🎤 Listening... Speak now!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedChat;