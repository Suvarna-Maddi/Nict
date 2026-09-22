import { useState, useRef, useEffect } from 'react';
import { Send, Minimize2 } from 'lucide-react';
import { getChatbotResponse } from '../data/chatbotKnowledge';
import chatbotLogo from '../assets/chatbot-logo.png';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'msg-0', sender: 'bot', text: 'Hi! I am the NICT Virtual Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getChatbotResponse(userMsg.text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleQuickAction = (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    
    setTimeout(() => {
      const botResponse = getChatbotResponse(text);
      const botMsg: Message = { id: (Date.now() + 1).toString(), sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-[5.5rem] right-4 md:bottom-[7.5rem] md:right-6 z-50 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center hover:scale-110 hover:-translate-y-2 transition-all duration-300 drop-shadow-[0_10px_25px_rgba(38,97,156,0.6)] ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <img src={chatbotLogo} alt="Chat Assistant" className="w-full h-full object-contain" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 w-[calc(100vw-2rem)] md:w-[400px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
        style={{ height: isOpen ? '600px' : '0px', maxHeight: 'calc(100vh - 4rem)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-4 md:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 text-white">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
              <img src={chatbotLogo} alt="Bot" className="w-full h-full object-contain drop-shadow-md" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">NICT Assistant</h3>
              <p className="text-xs text-primary-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> Online
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <Minimize2 size={20} />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                msg.sender === 'user' 
                  ? 'bg-slate-900 text-white rounded-br-sm' 
                  : 'bg-white text-slate-700 border border-slate-200 shadow-sm rounded-bl-sm whitespace-pre-wrap'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions / Topics */}
        <div className="px-4 py-3 bg-slate-50 flex flex-wrap gap-2 shrink-0 border-t border-slate-100/50">
          <button onClick={() => handleQuickAction('Courses')} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm">Courses</button>
          <button onClick={() => handleQuickAction('Timings')} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm">Timings</button>
          <button onClick={() => handleQuickAction('Location')} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm">Location</button>
          <button onClick={() => handleQuickAction('Contact')} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm">Contact</button>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="flex-1 bg-slate-100 rounded-full pl-5 pr-12 py-3.5 text-sm md:text-base text-slate-800 outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-1.5 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} className="ml-1" />
            </button>
          </div>
          <div className="text-center mt-3">
             <p className="text-[10px] text-slate-400 font-medium">Powered by NICT Knowledge Base</p>
          </div>
        </div>
      </div>
    </>
  );
}
