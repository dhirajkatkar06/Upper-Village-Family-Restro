
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatWithGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! Welcome to Upper Village Family Restaurant. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMessage }] });

    const aiResponse = await chatWithGemini(history);
    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#c5a059] rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-8 right-8 z-50 w-[90vw] md:w-96 h-[500px] bg-[#1a1a1a] rounded-2xl shadow-2xl border border-stone-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-[#c5a059] p-4 flex justify-between items-center text-black">
          <div className="flex items-center space-x-2">
            <Bot size={20} />
            <span className="font-bold uppercase tracking-wider text-xs">Village Concierge</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] space-x-2 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-stone-700' : 'bg-[#c5a059]/20 text-[#c5a059]'}`}>
                  {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[#c5a059] text-black' : 'bg-stone-800 text-stone-200'}`}>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#c5a059]/20 text-[#c5a059] flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="p-3 rounded-2xl bg-stone-800 flex items-center">
                  <Loader2 size={16} className="animate-spin text-[#c5a059]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-stone-800 flex space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about menu, hours, or location..."
            className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-stone-200 focus:outline-none focus:border-[#c5a059]"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-[#c5a059] text-black p-2 rounded-lg hover:bg-[#b08d4b] disabled:opacity-50 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
