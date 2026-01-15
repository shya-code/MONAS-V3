import React from 'react';
import { Video, Heart, Radio, Users, Zap, ArrowLeftFromLine } from 'lucide-react';
import { Channel } from '../types';

interface SidebarProps {
  onSelectChannel: (channel: Channel) => void;
}

// Mock data
const RECOMMENDED = [
  { id: '1', name: 'Just Chatting', category: 'IRL', viewers: '489K', avatar: 'https://picsum.photos/seed/cat1/50/50' },
  { id: '2', name: 'VALORANT', category: 'FPS, Shooter', viewers: '68.3K', avatar: 'https://picsum.photos/seed/cat2/50/50' },
  { id: '3', name: 'League of Legends', category: 'RPG, Strategy', viewers: '171K', avatar: 'https://picsum.photos/seed/cat3/50/50' },
  { id: '7', name: 'Counter-Strike', category: 'FPS, Shooter', viewers: '201K', avatar: 'https://picsum.photos/seed/cat4/50/50' },
  { id: '8', name: 'Minecraft', category: 'Simulation', viewers: '169K', avatar: 'https://picsum.photos/seed/cat5/50/50' },
];

const LIVE_CHANNELS = [
    { id: '11', name: 'Zethiann', category: 'Black Desert', viewers: '661', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zethiann' },
    { id: '12', name: 'Blue_Squadron', category: 'Where Winds Meet', viewers: '360', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blue' },
    { id: '13', name: 'Divios', category: 'Black Desert', viewers: '278', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divios' },
    { id: '14', name: 'Jnny', category: 'Black Desert', viewers: '1.2K', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jnny' },
];

export const Sidebar: React.FC<SidebarProps> = ({ onSelectChannel }) => {
  const mapToChannel = (item: any): Channel => ({
    id: item.id,
    name: item.name,
    title: `${item.name}'s Stream`,
    category: item.category,
    viewers: item.viewers,
    thumbnail: `https://picsum.photos/seed/${item.id}/400/225`,
    followers: '10K'
  });

  return (
    <div className="w-[240px] h-full bg-[#1f2128] border-r border-[#2d3039] flex flex-col flex-shrink-0 overflow-y-auto no-scrollbar hidden md:flex">
      
      {/* Header Area */}
      <div className="px-3 pt-4 pb-2 flex items-center justify-between">
          <h2 className="text-lg font-[900] text-white">For You</h2>
          <button className="text-slate-400 hover:bg-[#2d3039] p-1 rounded transition-colors">
              <ArrowLeftFromLine size={16} />
          </button>
      </div>

      {/* Recommended Categories (Matching the image "Recommended Categories") */}
      <div className="py-2">
        <div className="px-3 mb-2 flex items-center justify-between group cursor-pointer">
          <h3 className="text-[11px] font-bold text-[#adadb8] uppercase">Recommended Categories</h3>
        </div>
        <div className="flex flex-col">
          {RECOMMENDED.map((item) => (
            <div 
              key={item.id}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-[#2d3039] cursor-pointer group transition-colors"
            >
              <img src={item.avatar} className="w-8 h-8 rounded-full bg-[#0f1117]" alt="" />
              <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                <span className="text-sm font-bold text-slate-200 truncate group-hover:text-white leading-tight">{item.name}</span>
                <span className="text-[11px] text-slate-400 font-medium truncate leading-tight">{item.category}</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span className="text-[11px] font-bold text-slate-300">{item.viewers}</span>
              </div>
            </div>
          ))}
        </div>
         <div className="px-3 py-2">
             <button className="text-[11px] text-orange-500 font-bold hover:underline">Show More</button>
         </div>
      </div>

      {/* Live Channels */}
      <div className="py-2 border-t border-[#2d3039]">
        <div className="px-3 mb-2 flex items-center justify-between">
          <h3 className="text-[11px] font-bold text-[#adadb8] uppercase">Live Channels</h3>
        </div>
        <div className="flex flex-col">
          {LIVE_CHANNELS.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelectChannel(mapToChannel(item))}
              className="flex items-center gap-3 py-1.5 px-3 hover:bg-[#2d3039] cursor-pointer group transition-colors"
            >
              <img src={item.avatar} className="w-8 h-8 rounded-full bg-[#0f1117]" alt="" />
              <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                <span className="text-sm font-bold text-slate-200 truncate group-hover:text-white leading-tight">{item.name}</span>
                <span className="text-[11px] text-slate-400 font-medium truncate leading-tight">{item.category}</span>
              </div>
              <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span className="text-[11px] font-bold text-slate-300">{item.viewers}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-[#2d3039]">
         <div className="bg-[#181a21] rounded-xl p-3 text-center border border-[#2d3039] cursor-pointer hover:border-orange-500 transition-all">
            <div className="flex items-center justify-center gap-2 text-white mb-1">
              <Zap size={14} fill="currentColor" className="text-orange-500" />
              <span className="font-black text-[10px] uppercase">Monad Native</span>
            </div>
            <p className="text-[9px] text-slate-500 font-bold leading-tight">Settlement Layer Active</p>
         </div>
      </div>
    </div>
  );
};