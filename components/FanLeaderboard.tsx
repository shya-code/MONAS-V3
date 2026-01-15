
import React from 'react';
import { Medal, Star } from 'lucide-react';

interface Fan {
  id: string;
  username: string;
  points: number;
  avatar: string;
}

const MOCK_FANS: Fan[] = [
  { id: '1', username: '0xAlpha_Nodes', points: 12450, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha' },
  { id: '2', username: 'MonadWhale', points: 9820, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Whale' },
  { id: '3', username: 'GigaStreamer', points: 7100, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Giga' },
];

export const FanLeaderboard: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-sm border border-slate-800 p-3 shadow-2xl relative overflow-hidden group">
      {/* Background glow effect */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full"></div>
      
      <div className="flex items-center justify-between mb-3 relative z-10">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
          Top Stream Fans
        </h3>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
          <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
        </div>
      </div>

      <div className="flex justify-between items-end gap-2 flex-grow relative z-10 pb-1">
        {/* 2nd Place */}
        <div className="flex flex-col items-center flex-1 animate-text stagger-2">
          <div className="relative mb-2">
            <div className="w-10 h-10 rounded-sm bg-slate-800 border border-slate-700 p-0.5 relative">
              <img src={MOCK_FANS[1].avatar} alt="2nd" className="w-full h-full object-cover rounded-sm" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-slate-200 text-slate-900 rounded-full p-0.5 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              <Medal size={10} className="fill-slate-400 text-slate-500" />
            </div>
          </div>
          <span className="text-[8px] font-bold text-slate-300 uppercase truncate w-full text-center tracking-tighter">
            {MOCK_FANS[1].username}
          </span>
          <span className="text-[9px] font-mono font-black text-slate-500">
            {MOCK_FANS[1].points.toLocaleString()}
          </span>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center flex-1 animate-text stagger-1 scale-110 mb-2">
          <div className="relative mb-2">
            <div className="absolute -inset-1 bg-yellow-500/20 blur-md rounded-full animate-pulse"></div>
            <div className="w-12 h-12 rounded-sm bg-slate-800 border-2 border-yellow-500/50 p-0.5 relative z-10">
              <img src={MOCK_FANS[0].avatar} alt="1st" className="w-full h-full object-cover rounded-sm" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-yellow-400 text-slate-950 rounded-full p-1 shadow-[0_0_15px_rgba(250,204,21,0.5)] z-20">
              <Medal size={12} className="fill-yellow-600 text-yellow-800" />
            </div>
          </div>
          <span className="text-[9px] font-black text-white uppercase truncate w-full text-center tracking-tighter">
            {MOCK_FANS[0].username}
          </span>
          <span className="text-[10px] font-mono font-black text-yellow-500">
            {MOCK_FANS[0].points.toLocaleString()}
          </span>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center flex-1 animate-text stagger-3">
          <div className="relative mb-2">
            <div className="w-10 h-10 rounded-sm bg-slate-800 border border-slate-700 p-0.5 relative">
              <img src={MOCK_FANS[2].avatar} alt="3rd" className="w-full h-full object-cover rounded-sm" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-700 text-white rounded-full p-0.5 shadow-[0_0_10px_rgba(180,83,9,0.3)]">
              <Medal size={10} className="fill-amber-500 text-amber-900" />
            </div>
          </div>
          <span className="text-[8px] font-bold text-slate-300 uppercase truncate w-full text-center tracking-tighter">
            {MOCK_FANS[2].username}
          </span>
          <span className="text-[9px] font-mono font-black text-slate-500">
            {MOCK_FANS[2].points.toLocaleString()}
          </span>
        </div>
      </div>
      
      {/* Status line */}
      <div className="mt-2 pt-2 border-t border-slate-800/50 flex items-center justify-between relative z-10">
        <span className="text-[7px] font-mono text-slate-600 uppercase tracking-widest">Live_Ranking_v2.0</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[7px] font-bold text-emerald-900 uppercase">Updating</span>
        </div>
      </div>
    </div>
  );
};
