import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface KidChatInterfaceProps {
  childName?: string;
  childAge?: number;
}

const KidChatInterface: React.FC<KidChatInterfaceProps> = ({ 
  childName = "Explorer", 
  childAge = 8 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi ${childName}! 👋 I'm KidBot, your friendly learning buddy! What exciting thing would you like to explore today?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

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

  // Fetch suggested topics
  useEffect(() => {
    fetchSuggestedTopics();
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchSuggestedTopics = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chat/topics');
      const data = await response.json();
      setSuggestedTopics(data.topics || []);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      // Fallback topics
      setSuggestedTopics([
        "Tell me about dinosaurs! 🦕",
        "How do airplanes fly? ✈️",
        "What lives in the ocean? 🌊",
        "Can you teach me about colors? 🌈"
      ]);
    }
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

    try {
      const response = await fetch('http://localhost:3001/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          childAge: childAge
        }),
      });

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Speak the response
      speakText(data.response);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! I'm having trouble thinking right now. Can you try asking me something else? 🤔",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-kid-yellow via-kid-pink to-kid-blue">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm p-4 shadow-lg">
        <div className="flex items-center justify-center">
          <Sparkles className="text-kid-purple mr-2 animate-pulse" size={24} />
          <h1 className="text-2xl font-bold text-gray-800 font-kid">
            Chat with KidBot! 🤖
          </h1>
          <Sparkles className="text-kid-purple ml-2 animate-pulse" size={24} />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-4 rounded-2xl speech-bubble ${
                message.role === 'user'
                  ? 'bg-kid-blue text-white ml-4'
                  : 'bg-white text-gray-800 mr-4 shadow-md'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-2">🤖</span>
                  <span className="font-bold text-kid-purple">KidBot</span>
                </div>
              )}
              <p className="text-lg font-kid leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl mr-4 shadow-md">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🤖</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-kid-purple rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-kid-purple rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-kid-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Topics */}
      {suggestedTopics.length > 0 && (
        <div className="p-4 bg-white/80 backdrop-blur-sm">
          <p className="text-center font-bold text-gray-700 mb-3 font-kid">
            Try asking me about these fun topics! 🌟
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedTopics.slice(0, 4).map((topic, index) => (
              <button
                key={index}
                onClick={() => sendMessage(topic)}
                className="bg-kid-green text-white px-4 py-2 rounded-full text-sm font-kid kid-button touch-target shadow-md"
                disabled={isLoading}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-white/90 backdrop-blur-sm">
        <div className="flex items-center space-x-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here or use the microphone! 😊"
              className="w-full p-4 pr-12 border-2 border-kid-purple/30 rounded-2xl resize-none font-kid text-lg focus:border-kid-purple focus:outline-none"
              rows={2}
              disabled={isLoading}
            />
          </div>
          
          {/* Voice Input Button */}
          <button
            onClick={startListening}
            disabled={isLoading || isListening}
            className={`p-4 rounded-full kid-button touch-target ${
              isListening 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-kid-orange'
            } text-white shadow-lg`}
          >
            <Mic size={24} />
          </button>

          {/* Send Button */}
          <button
            onClick={() => sendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-4 bg-kid-blue text-white rounded-full kid-button touch-target disabled:opacity-50 shadow-lg"
          >
            <Send size={24} />
          </button>
        </div>
        
        {isListening && (
          <p className="text-center mt-2 text-kid-purple font-bold animate-pulse font-kid">
            🎤 Listening... Speak now!
          </p>
        )}
      </div>
    </div>
  );
};

export default KidChatInterface;