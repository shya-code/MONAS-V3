import React, { useState } from 'react';
import { Channel } from '../types';
import { 
  Search, 
  Gamepad2, 
  Film, 
  Mic2, 
  Tv, 
  Users, 
  Play, 
  Music, 
  MessageCircle, 
  Swords, 
  Palette, 
  Activity,
  Sparkles,
  Zap,
  Filter
} from 'lucide-react';

interface BrowseChannelsProps {
  onSelectChannel: (channel: Channel) => void;
}

const CATEGORIES = [
  { name: 'Games', icon: <Gamepad2 size={16} /> },
  { name: 'Just Chatting', icon: <MessageCircle size={16} /> },
  { name: 'Music', icon: <Music size={16} /> },
  { name: 'Esports', icon: <Swords size={16} /> },
  { name: 'Creative', icon: <Palette size={16} /> },
  { name: 'IRL', icon: <Mic2 size={16} /> },
];

const MOCK_CHANNELS: Channel[] = [
  { id: '1', name: 'Monad_King', title: 'Speedrunning Monad Chess Beta!', category: 'Games', viewers: '12.4K', followers: '128.4K', thumbnail: 'https://picsum.photos/seed/game1/400/225' },
  { id: '2', name: 'Cinema_Node', title: 'Night Shift: Sci-Fi Marathon', category: 'Movies', viewers: '8.1K', followers: '45.2K', thumbnail: 'https://picsum.photos/seed/movie1/400/225' },
  { id: '3', name: 'Dev_Stream', title: 'Building the Future of DeFi', category: 'Tech', viewers: '4.2K', followers: '12.5K', thumbnail: 'https://picsum.photos/seed/tech1/400/225' },
  { id: '4', name: 'World_Traveler', title: 'Walking through Tokyo at Night', category: 'IRL', viewers: '25.6K', followers: '850.2K', thumbnail: 'https://picsum.photos/seed/irl1/400/225' },
  { id: '5', name: 'Beats_By_Monad', title: 'Lo-Fi Chill Beats for Coding', category: 'Music', viewers: '3.1K', followers: '22.1K', thumbnail: 'https://picsum.photos/seed/music1/400/225' },
  { id: '6', name: 'Talk_Protocol', title: 'Daily Market Recap & Alpha', category: 'Just Chatting', viewers: '15.2K', followers: '34.8K', thumbnail: 'https://picsum.photos/seed/chat1/400/225' },
  { id: '7', name: 'Championship_Live', title: 'Global Esports Finals: Round 4', category: 'Esports', viewers: '142K', followers: '2.4M', thumbnail: 'https://picsum.photos/seed/esports1/400/225' },
  { id: '8', name: 'Pixel_Artist', title: 'Designing Monas UI V3 Live', category: 'Creative', viewers: '2.8K', followers: '8.9K', thumbnail: 'https://picsum.photos/seed/creative1/400/225' },
  { id: '9', name: 'Pro_Gamer_X', title: 'Rank 1 Grind - Non Stop', category: 'Games', viewers: '18.9K', followers: '56.3K', thumbnail: 'https://picsum.photos/seed/game2/400/225' },
  { id: '10', name: 'Retro_Film', title: '80s Aesthetic Movies Only', category: 'Movies', viewers: '3.4K', followers: '14.2K', thumbnail: 'https://picsum.photos/seed/movie2/400/225' },
  { id: '11', name: 'Hack_The_Mainnet', title: 'Finding bugs in smart contracts', category: 'Tech', viewers: '5.5K', followers: '28.1K', thumbnail: 'https://picsum.photos/seed/tech2/400/225' },
  { id: '12', name: 'Chat_With_Me', title: 'Daily Coffee & Crypto News', category: 'IRL', viewers: '10.2K', followers: '19.4K', thumbnail: 'https://picsum.photos/seed/irl2/400/225' },
];

export const BrowseChannels: React.FC<BrowseChannelsProps> = ({ onSelectChannel }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredChannels = activeCategory === 'All' 
    ? MOCK_CHANNELS 
    : MOCK_CHANNELS.filter(c => c.category === activeCategory);

  return (
    <div className="h-full w-full p-8 overflow-y-auto no-scrollbar">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <h2 className="text-4xl font-[900] text-white tracking-tighter uppercase">Browse</h2>
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button 
             onClick={() => setActiveCategory('All')}
             className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${activeCategory === 'All' ? 'bg-white text-black' : 'bg-[#1f2128] text-slate-400 hover:bg-[#2d3039]'}`}
          >
            All
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all ${activeCategory === cat.name ? 'bg-white text-black' : 'bg-[#1f2128] text-slate-400 hover:bg-[#2d3039]'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
         <Filter size={14} className="text-orange-500" />
         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by: Viewers (High to Low)</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
        {filteredChannels.map((channel, i) => (
          <div 
            key={channel.id} 
            className="group cursor-pointer flex flex-col gap-3"
            onClick={() => onSelectChannel(channel)}
          >
            {/* Thumbnail Card */}
            <div className="relative aspect-video bg-[#1f2128] rounded-lg overflow-hidden transition-transform duration-300 group-hover:translate-y-[-4px] group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
               <img 
                 src={channel.thumbnail} 
                 alt={channel.title} 
                 className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
               />
               <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-[900] px-1.5 py-0.5 rounded uppercase tracking-widest">
                 LIVE
               </div>
               <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                 {channel.viewers} Viewers
               </div>
               <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity border-2 border-orange-500 rounded-lg box-border pointer-events-none"></div>
            </div>

            {/* Info */}
            <div className="flex gap-3">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${channel.name}`} className="w-10 h-10 rounded-full bg-[#1f2128]" alt="" />
               <div className="flex flex-col min-w-0">
                  <h4 className="text-sm font-bold text-slate-200 truncate group-hover:text-orange-500 transition-colors">{channel.title}</h4>
                  <span className="text-xs font-medium text-slate-500">{channel.name}</span>
                  <div className="mt-1">
                     <span className="text-[10px] font-bold text-slate-400 bg-[#1f2128] px-1.5 py-0.5 rounded-sm hover:bg-[#2d3039] transition-colors inline-block">{channel.category}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};