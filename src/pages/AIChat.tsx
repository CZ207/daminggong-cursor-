import React, { useState, useRef, useEffect } from 'react';
import TopNav from '../components/TopNav';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '您好！我是大明宫AI助手。您可以向我询问关于大明宫的历史、建筑、文化等任何问题。例如：“大明宫是谁建的？”或“含元殿有多大？”' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: '这是一个AI演示界面。在后期接入真实的大语言模型后，我将为您提供关于“' + input + '”的详细解答。' }]);
    }, 1000);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans flex flex-col">
      <TopNav />
      
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src="https://img.cdn1.vip/i/69c233e0e7e91_1774334944.webp" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      </div>

      {/* Chat Container */}
      <div className="relative z-10 flex-1 flex flex-col max-w-4xl w-full mx-auto pt-24 pb-6 px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-serif tracking-widest text-red-500">AI+大明宫</h1>
          <p className="text-xs text-gray-400 mt-2 tracking-widest">您的专属大唐文化导览</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-6 mb-4 space-y-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-red-700 ml-3' : 'bg-white/20 mr-3'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-3 md:p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-red-700/80 text-white rounded-tr-none' 
                    : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="向AI提问关于大明宫的问题..."
            className="flex-1 bg-transparent px-6 py-3 text-white placeholder-white/40 outline-none text-sm md:text-base"
          />
          <button 
            type="submit"
            disabled={!input.trim()}
            className="bg-red-700 hover:bg-red-600 disabled:bg-red-900 disabled:opacity-50 text-white p-3 rounded-full transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
