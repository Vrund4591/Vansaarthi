import { useState, useRef, useEffect } from 'react';
import Card from './Card';
import { generateAvatarUrl } from '../utils/avatar';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm Vansaarthi's assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    // Initialize chat session when opened
    if (isOpen && !sessionId) {
      const initializeSession = async () => {
        try {
          const response = await fetch(`${apiUrl}/api/chatbot/initialize`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
          });
          
          if (!response.ok) {
            throw new Error('Failed to initialize chat session');
          }
          
          const data = await response.json();
          setSessionId(data.sessionId); // This is now properly defined
        } catch (error) {
          console.error('Error initializing chat:', error);
        }
      };
      
      initializeSession();
    }
  }, [isOpen, sessionId, apiUrl]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to format text with markdown-like syntax
  const formatMessage = (text) => {
    if (!text) return '';
    
    // Handle bold text: **bold**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text: *italic*
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle underline: __underlined__
    text = text.replace(/__(.*?)__/g, '<u>$1</u>');
    
    // Handle code blocks: `code`
    text = text.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm font-mono">$1</code>');
    
    // Handle bullet points
    text = text.replace(/^- (.*)/gm, '• $1');
    
    // Handle numbered lists
    text = text.replace(/^\d+\. (.*)/gm, (match, p1, offset, string) => {
      return `<span class="mr-2">•</span>${p1}`;
    });
    
    // Handle line breaks
    text = text.replace(/\n/g, '<br />');
    
    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use quick chat endpoint - no need to use session for simple implementation
      const response = await fetch(`${apiUrl}/api/chatbot/quick`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.response, 
        isBot: true,
        isFormatted: true // Add this flag to identify messages that should be formatted
      }]);
    } catch (error) {
      console.error('Error with chatbot API:', error);
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", 
        isBot: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat bubble button - increased size on mobile */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-[#3BDE3B] text-black rounded-full p-3 md:p-3 shadow-lg hover:bg-[#32c932] transition-colors duration-200 flex items-center justify-center w-12 h-12 md:w-12 md:h-12"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {/* Chat window - responsive sizing */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:relative flex items-center justify-center md:block">
          {/* Mobile overlay backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>
          
          <Card backgroundColor="bg-white" textColor="text-black" className="relative z-10 w-full md:w-auto max-w-md mx-auto md:mx-0">
            <div className="w-full h-[85vh] md:h-[450px] md:w-[350px] lg:w-[380px] flex flex-col">
              {/* Chat header - better spacing for mobile */}
              <div className="bg-[#3BDE3B] text-black px-4 py-3 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                    <img src="/Vansaarthi.svg" alt="Vansaarthi" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-semibold">Vansaarthi Assistant</h3>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-black hover:bg-[#32c932] p-2 rounded-full transition-colors duration-200"
                  aria-label="Close chat"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {/* Chat body - improved scrolling for mobile */}
              <div 
                ref={chatBodyRef}
                className="flex-1 p-4 overflow-y-auto bg-gray-50"
              >
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <img src="/Vansaarthi.svg" alt="Bot" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[80%] py-2 px-3 rounded-lg ${
                        message.isBot 
                          ? 'bg-white border border-gray-200 text-black' 
                          : 'bg-[#3BDE3B] text-black'
                      }`}
                    >
                      {message.isFormatted ? (
                        <div 
                          className="text-sm md:text-sm chat-message"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                        />
                      ) : (
                        <p className="text-sm md:text-sm whitespace-pre-wrap">{message.text}</p>
                      )}
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
                        <img 
                          src={generateAvatarUrl("User")} 
                          alt="User" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <img src="/Vansaarthi.svg" alt="Bot" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-white border border-gray-200 text-gray-500 py-2 px-3 rounded-lg flex items-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input - better sized for touch input */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex sticky bottom-0 bg-white">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-3 py-3 md:py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#3BDE3B] text-base"
                  placeholder="Type a message..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-[#3BDE3B] text-black px-4 py-3 md:py-2 rounded-r-lg hover:bg-[#32c932] transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
