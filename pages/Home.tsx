import React, { useState } from 'react';
import { UserRole } from '../types';
import { Play, Radio, ArrowRight, TrendingUp, Zap, Tv, ChevronLeft, ChevronRight, Volume2, ShieldCheck, MoreVertical } from 'lucide-react';

interface HomeProps {
  onSelectRole: (role: UserRole) => void;
}

const LIVE_CHANNELS = [
  {
    id: 1,
    name: 'Zethiann',
    title: '!CODE : Zethiann - HUGE GAINS',
    game: 'Black Desert',
    viewers: '661',
    tags: ['English', 'NotBaldYet'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zethiann',
    thumbnail: 'https://picsum.photos/seed/zeth/400/225'
  },
  {
    id: 2,
    name: 'Blue_Squadron',
    title: '[DROPS] 🔥 FIGHTING THE HARDEST BOSS',
    game: 'Where Winds Meet',
    viewers: '360',
    tags: ['English', 'DropsEnabled'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Blue',
    thumbnail: 'https://picsum.photos/seed/blue/400/225'
  },
  {
    id: 3,
    name: 'Divios',
    title: 'Wukong/Sage | !Code: Divios',
    game: 'Black Desert',
    viewers: '278',
    tags: ['Furry', 'DropsEnabled'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divios',
    thumbnail: 'https://picsum.photos/seed/divios/400/225'
  },
  {
    id: 4,
    name: 'Jnny',
    title: 'ALCHEMY STONE GUIDE in the ...',
    game: 'Black Desert',
    viewers: '1.2K',
    tags: ['English', 'DropsEnabled'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jnny',
    thumbnail: 'https://picsum.photos/seed/jnny/400/225'
  },
    {
    id: 5,
    name: 'Monad_Official',
    title: 'Global Championship Finals - Day 2',
    game: 'Esports',
    viewers: '12.4K',
    tags: ['Official', 'Tournament'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Monad',
    thumbnail: 'https://picsum.photos/seed/monad/400/225'
  },
    {
    id: 6,
    name: 'Tech_Guru',
    title: 'Reviewing the new Monad nodes',
    game: 'Tech',
    viewers: '856',
    tags: ['English', 'Educational'],
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech',
    thumbnail: 'https://picsum.photos/seed/tech/400/225'
  }
];

export const Home: React.FC<HomeProps> = ({ onSelectRole }) => {
  return (
    <div className="h-full overflow-y-auto no-scrollbar bg-[#0f1117] pb-20">
      
      {/* Featured Carousel Section */}
      <div className="w-full max-w-[1600px] mx-auto pt-8 px-8 mb-12">
        <div className="relative h-[300px] md:h-[350px] flex items-center justify-center gap-4">
            
            {/* Left Preview (Visual only) */}
            <div className="hidden xl:block w-[120px] h-[80%] bg-[#181a21] rounded-lg opacity-40 transform scale-90 cursor-pointer hover:opacity-60 transition-all"></div>
            
            <button className="hidden md:flex absolute left-4 z-20 p-2 hover:bg-[#2d3039] rounded-lg transition-colors text-slate-300">
               <ChevronLeft size={24} />
            </button>

            {/* Main Featured Card */}
            <div className="flex-grow max-w-4xl h-full flex shadow-2xl transition-all duration-500 hover:shadow-orange-500/10 group cursor-pointer" onClick={() => onSelectRole('viewer')}>
                {/* Info Side (Left) */}
                <div className="hidden md:flex w-[280px] bg-[#181a21] flex-col p-6 justify-between rounded-l-lg border-y border-l border-[#2d3039] group-hover:border-orange-500/30 transition-colors">
                   <div>
                      <div className="flex items-center gap-3 mb-4">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=mylittlelakes" className="w-12 h-12 rounded-full border-2 border-orange-500 p-0.5" alt="avatar" />
                         <div>
                            <div className="text-orange-500 text-sm font-bold">mylittlelakes</div>
                            <div className="text-purple-400 text-xs font-medium">Animal Crossing</div>
                         </div>
                      </div>
                      <div className="mb-2">
                        <span className="bg-slate-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">English</span>
                      </div>
                      <p className="text-slate-300 text-sm font-medium line-clamp-4 leading-relaxed">
                         Cozy vibes only! Building the ultimate island paradise on Monad. Come chill, settle transactions in real-time, and enjoy the stream! 🏝️✨
                      </p>
                   </div>
                   <div className="text-[11px] text-slate-400 font-bold">
                      Streamer since 2024
                   </div>
                </div>

                {/* Video Side (Right) */}
                <div className="flex-1 relative bg-black rounded-r-lg overflow-hidden border-y border-r border-[#2d3039] group-hover:border-orange-500/30 transition-colors">
                   <img src="https://picsum.photos/seed/acnh/800/450" className="w-full h-full object-cover" alt="stream" />
                   <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-[900] px-2 py-1 rounded-sm tracking-widest uppercase">LIVE</div>
                   <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
                      2K viewers
                   </div>
                   <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm p-1.5 rounded text-white hover:bg-black/80 transition-colors">
                      <Volume2 size={16} />
                   </div>
                </div>
            </div>

            <button className="hidden md:flex absolute right-4 z-20 p-2 hover:bg-[#2d3039] rounded-lg transition-colors text-slate-300">
               <ChevronRight size={24} />
            </button>

            {/* Right Preview */}
            <div className="hidden xl:block w-[120px] h-[80%] bg-[#181a21] rounded-lg opacity-40 transform scale-90 cursor-pointer hover:opacity-60 transition-all"></div>
        </div>
      </div>

      {/* Choose Your Path (Requested to Keep Theme/Buttons) */}
      <div className="max-w-[1600px] mx-auto px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => onSelectRole('viewer')}
            className="bg-[#181a21] border border-[#2d3039] hover:border-orange-500 p-6 rounded-lg cursor-pointer group transition-all flex items-center justify-between"
          >
             <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0f1117] rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors text-orange-500">
                   <Tv size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-[900] text-white uppercase italic">Start Watching</h3>
                   <p className="text-xs text-slate-400 font-medium">Discover liquid streaming channels</p>
                </div>
             </div>
             <ArrowRight size={20} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>

          <div 
            onClick={() => onSelectRole('streamer')}
            className="bg-[#181a21] border border-[#2d3039] hover:border-emerald-500 p-6 rounded-lg cursor-pointer group transition-all flex items-center justify-between"
          >
             <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0f1117] rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors text-emerald-500">
                   <Radio size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-[900] text-white uppercase italic">Go Live</h3>
                   <p className="text-xs text-slate-400 font-medium">Broadcast and earn MON/sec</p>
                </div>
             </div>
             <ArrowRight size={20} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      {/* Live Channels Grid */}
      <div className="max-w-[1600px] mx-auto px-8">
        <h2 className="text-lg font-[900] text-white mb-4 hover:text-orange-500 cursor-pointer inline-flex items-center gap-2 group">
           Live channels we think you'll like
           <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">→</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-8">
           {LIVE_CHANNELS.map((channel) => (
             <div key={channel.id} className="flex flex-col gap-3 group cursor-pointer" onClick={() => onSelectRole('viewer')}>
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[#1f2128] overflow-hidden transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 shadow-lg">
                   <img src={channel.thumbnail} className="w-full h-full object-cover" alt={channel.title} />
                   <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-[900] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                      LIVE
                   </div>
                   <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      {channel.viewers} viewers
                   </div>
                   {/* Hover Border Effect */}
                   <div className="absolute inset-0 border-l-4 border-b-4 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Metadata */}
                <div className="flex gap-3">
                   <div className="flex-shrink-0">
                      <img src={channel.avatar} className="w-10 h-10 rounded-full bg-[#181a21]" alt={channel.name} />
                   </div>
                   <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white leading-tight truncate group-hover:text-orange-500 transition-colors" title={channel.title}>
                         {channel.title}
                      </h3>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                         {channel.name}
                         <ShieldCheck size={12} className="text-slate-400 fill-black" />
                      </div>
                      <div className="text-xs text-purple-400 hover:underline mt-0.5 cursor-pointer">
                         {channel.game}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                         {channel.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-[#1f2128] text-slate-400 text-[10px] font-bold rounded-full hover:bg-[#2d3039] transition-colors">
                               {tag}
                            </span>
                         ))}
                      </div>
                   </div>
                   <div className="flex-shrink-0 pt-1">
                      <MoreVertical size={16} className="text-slate-500 hover:text-white" />
                   </div>
                </div>
             </div>
           ))}
        </div>
        
        {/* Show More Line */}
        <div className="w-full h-[1px] bg-[#2d3039] my-12 relative flex items-center justify-center">
           <button className="bg-[#0f1117] px-4 text-xs font-bold text-orange-500 hover:text-orange-400 uppercase tracking-widest flex items-center gap-2">
              Show more <ChevronRight size={12} />
           </button>
        </div>
      </div>

    </div>
  );
};