import React, { useState, useEffect, useRef } from 'react';
import { Send, Hash, Zap, Medal, Trophy, MessageSquare, ChevronRight, Settings, BarChart2, X, Plus, Flame } from 'lucide-react';
import { ChatMessage } from '../types';

interface LiveChatProps {
  username: string;
  isStreamer?: boolean;
}

const MOCK_USERS_DATA = [
  { name: '0xAlpha', tier: 'Diamond' },
  { name: 'MonadWhale', tier: 'Platinum' },
  { name: 'GigaStreamer', tier: 'Gold' },
  { name: 'DevNode', tier: 'Silver' },
  { name: 'AlphaSeeker', tier: 'Silver' },
  { name: 'GigaChad', tier: 'Diamond' }
] as const;

export const LiveChat: React.FC<LiveChatProps> = ({ username, isStreamer = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const scrollRef = useRef<HTMLDivElement>(null);

  const mockTexts = [
    'LFG! Per-second model is huge.',
    'Monad finality is real.',
    'Sent some hype! 🚀',
    'Best stream on testnet.',
    'Alpha spotted.',
    'Liquid payouts are the future.'
  ];

  const getTierStyle = (tier?: string) => {
    switch(tier) {
      case 'Diamond': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_8px_rgba(34,211,238,0.1)]';
      case 'Platinum': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Gold': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Silver': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
      default: return 'hidden';
    }
  };

  useEffect(() => {
    const initialMessages = Array.from({ length: 15 }).map((_, i) => {
      const randomUser = MOCK_USERS_DATA[i % MOCK_USERS_DATA.length];
      return {
        id: Math.random().toString(36).substr(2, 9),
        user: randomUser.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 100}`,
        text: mockTexts[i % mockTexts.length],
        timestamp: new Date(),
        tier: randomUser.tier
      };
    });
    setMessages(initialMessages);

    const interval = setInterval(() => {
      const rand = Math.random();
      const randomUser = MOCK_USERS_DATA[Math.floor(Math.random() * MOCK_USERS_DATA.length)];
      
      // 10% chance to simulate a SUPER IGNITE donation
      if (rand > 0.90) {
        const amount = (Math.random() * 100).toFixed(0);
        const igniteMessage: ChatMessage = {
           id: Math.random().toString(36).substr(2, 9),
           user: randomUser.name,
           avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
           text: `Just dropped ${amount} MON! Keep building! 🔥`,
           timestamp: new Date(),
           isIgnite: true,
           igniteAmount: amount,
           tier: randomUser.tier
        };
        setMessages(prev => [...prev.slice(-50), igniteMessage]);
      } 
      // Regular chat message
      else if (rand > 0.6) {
        const newMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          user: randomUser.name,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
          text: mockTexts[Math.floor(Math.random() * mockTexts.length)],
          timestamp: new Date(),
          tier: randomUser.tier
        };
        setMessages(prev => [...prev.slice(-50), newMessage]);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showPollCreator]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      user: username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      text: inputValue,
      timestamp: new Date(),
      tier: 'Diamond' // Auto-assign Diamond to the current user for demo purposes
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
  };

  const handleCreatePoll = () => {
    if (!pollQuestion.trim()) return;
    const validOptions = pollOptions.filter(o => o.trim());
    if (validOptions.length < 2) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      user: username,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      text: 'Poll Created',
      timestamp: new Date(),
      isPoll: true,
      pollData: {
        question: pollQuestion,
        options: validOptions.map(text => ({ text, votes: 0 })),
        totalVotes: 0
      },
      tier: 'Diamond'
    };
    setMessages(prev => [...prev, newMessage]);
    setShowPollCreator(false);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  const handleVote = (msgId: string, optionIndex: number) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId && msg.pollData) {
        const newOptions = [...msg.pollData.options];
        newOptions[optionIndex].votes += 1;
        return {
          ...msg,
          pollData: {
            ...msg.pollData,
            options: newOptions,
            totalVotes: msg.pollData.totalVotes + 1
          }
        };
      }
      return msg;
    }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  return (
    <div className="h-full flex flex-col bg-[#0f1117] overflow-hidden relative">
      {/* Chat Header */}
      <div className="p-3 border-b border-[#2d3039] bg-[#0f1117] flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-2">
           <span className="text-xs font-[900] text-slate-300 uppercase tracking-widest">Stream Chat</span>
        </div>
        <button className="text-slate-500 hover:text-white">
          <Settings size={14} />
        </button>
      </div>

      {/* Message Area */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-4 space-y-2 no-scrollbar bg-[#0f1117]"
      >
        <div className="text-center py-4 mb-4 border-b border-[#2d3039]">
           <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Welcome to the Chat Room</span>
           <p className="text-[9px] text-slate-600 mt-1">Be respectful and have fun.</p>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className="group">
            {/* SUPER IGNITE MESSAGE */}
            {msg.isIgnite ? (
              <div className="relative overflow-hidden rounded-xl my-3 p-[1px]">
                 {/* Animated Border Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 animate-gradient-xy"></div>
                 
                 <div className="relative bg-[#1a0b0b] rounded-xl p-3 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                    <div className="absolute top-0 right-0 p-2 opacity-20">
                       <Flame size={40} className="text-orange-500 animate-pulse" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-1 relative z-10">
                       <div className="p-1 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-lg">
                          <Zap size={12} className="text-white fill-white" />
                       </div>
                       <span className="text-[10px] font-[900] text-orange-400 uppercase tracking-widest">Super Ignite!</span>
                    </div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                       <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          {msg.user}
                          {msg.tier && (
                             <span className={`px-1 py-px rounded-[3px] text-[7px] font-black uppercase tracking-wider border ${getTierStyle(msg.tier)}`}>
                               {msg.tier}
                             </span>
                          )}
                       </span>
                       <span className="text-lg font-[900] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-mono">
                          {msg.igniteAmount} MON
                       </span>
                    </div>

                    <p className="mt-2 text-xs font-bold text-white/90 italic border-l-2 border-orange-500 pl-2">
                       "{msg.text}"
                    </p>
                 </div>
              </div>
            ) : msg.isPoll && msg.pollData ? (
              // POLL MESSAGE
              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-4 my-2 shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 size={16} className="text-orange-500" />
                  <span className="text-xs font-black text-white">{msg.pollData.question}</span>
                </div>
                <div className="space-y-2">
                  {msg.pollData.options.map((opt, idx) => {
                    const percentage = msg.pollData!.totalVotes > 0 
                      ? Math.round((opt.votes / msg.pollData!.totalVotes) * 100) 
                      : 0;
                    return (
                      <button 
                        key={idx}
                        onClick={() => handleVote(msg.id, idx)}
                        className="w-full relative h-9 bg-[#0f1117] rounded-lg border border-[#2d3039] overflow-hidden hover:border-orange-500/50 transition-all group/opt"
                      >
                        <div 
                          className="absolute inset-y-0 left-0 bg-orange-500/20 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <span className="text-[10px] font-bold text-slate-300 group-hover/opt:text-white relative z-10">{opt.text}</span>
                          <span className="text-[10px] font-mono font-bold text-slate-500 relative z-10">{percentage}%</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex justify-between items-center text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>{msg.pollData.totalVotes} votes</span>
                  <span className="text-emerald-500">Active</span>
                </div>
              </div>
            ) : (
              // STANDARD MESSAGE
              <div className="flex gap-2 items-start py-1 hover:bg-[#1f2128] px-1 rounded transition-colors">
                <span className="text-[10px] font-mono text-slate-500 mt-0.5 w-8 flex-shrink-0">
                  {msg.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                </span>
                <div className="flex-grow min-w-0 break-words leading-snug">
                  <span className={`text-xs font-bold mr-1.5 cursor-pointer hover:underline inline-flex items-center gap-1.5 ${msg.user === username ? 'text-orange-500' : 'text-[#adadb8]'}`}>
                    {msg.user}
                    {msg.tier && (
                       <span className={`px-1 py-px rounded-[3px] text-[8px] font-black uppercase tracking-wider border ${getTierStyle(msg.tier)}`}>
                         {msg.tier}
                       </span>
                    )}
                    <span className="text-slate-500">:</span>
                  </span>
                  <span className="text-xs font-medium text-slate-300">
                    {msg.text}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Poll Creator Panel Overlay */}
      {showPollCreator && isStreamer && (
        <div className="bg-[#181a21] border-t border-[#2d3039] p-4 animate-in slide-in-from-bottom-10 shadow-2xl relative z-20">
           <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-[900] text-white uppercase tracking-widest flex items-center gap-2">
                 <BarChart2 size={14} className="text-orange-500" /> Create Poll
              </h3>
              <button 
                onClick={() => setShowPollCreator(false)}
                className="text-slate-500 hover:text-white transition-colors"
              >
                 <X size={16} />
              </button>
           </div>
           
           <div className="space-y-3">
              <div>
                 <input 
                   type="text"
                   value={pollQuestion}
                   onChange={(e) => setPollQuestion(e.target.value)}
                   placeholder="Ask a question..."
                   className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2 px-3 text-xs font-bold text-white focus:border-orange-500 outline-none"
                   autoFocus
                 />
              </div>
              
              <div className="space-y-2">
                 {pollOptions.map((opt, i) => (
                    <input 
                      key={i}
                      type="text"
                      value={opt}
                      onChange={(e) => updateOption(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2 px-3 text-xs font-medium text-slate-300 focus:border-slate-500 outline-none"
                    />
                 ))}
              </div>

              <div className="pt-2">
                 <button 
                   onClick={handleCreatePoll}
                   className="w-full bg-orange-600 hover:bg-orange-700 text-white font-[900] text-xs uppercase py-2.5 rounded-lg tracking-wider transition-colors shadow-lg shadow-orange-900/20"
                 >
                    Start Poll
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-[#2d3039] bg-[#0f1117] relative z-30">
        <form onSubmit={handleSend} className="relative">
           <input 
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Send a message"
             className="w-full bg-[#181a21] border border-[#2d3039] rounded-lg py-3 pl-4 pr-20 text-xs font-medium text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all outline-none"
           />
           <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
             {isStreamer && (
               <>
                 <button 
                   type="button" 
                   onClick={() => setShowPollCreator(!showPollCreator)}
                   className={`p-1.5 rounded-md transition-all ${showPollCreator ? 'bg-orange-500/20 text-orange-500' : 'text-slate-500 hover:text-orange-500 hover:bg-[#2d3039]'}`}
                   title="Create Poll"
                 >
                    <BarChart2 size={16} />
                 </button>
                 <div className="w-[1px] h-4 bg-[#2d3039] mx-1"></div>
               </>
             )}
             <button 
               type="submit" 
               className="p-1.5 text-slate-500 hover:text-white hover:bg-[#2d3039] rounded-md transition-colors"
               title="Send"
             >
                <Send size={16} />
             </button>
           </div>
        </form>
        <div className="flex justify-between items-center mt-2 px-1">
           <span className="text-[10px] text-slate-500 font-bold">0 MON balance</span>
           <button className="text-[10px] font-bold text-orange-500 hover:text-orange-400">Chat Rules</button>
        </div>
      </div>
    </div>
  );
};