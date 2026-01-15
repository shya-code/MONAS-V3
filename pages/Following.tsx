import React from 'react';
import { Channel } from '../types';
import { Signal, Clock, Video, Ghost } from 'lucide-react';

interface FollowingProps {
  onSelectChannel: (channel: Channel) => void;
}

const LIVE_FOLLOWED: Channel[] = [
  { id: '1', name: 'Zethiann', title: '!CODE : Zethiann - HUGE GAINS', category: 'Black Desert', viewers: '661', thumbnail: 'https://picsum.photos/seed/zeth/400/225', followers: '12K' },
  { id: '3', name: 'Divios', title: 'Wukong/Sage | !Code: Divios', category: 'Black Desert', viewers: '278', thumbnail: 'https://picsum.photos/seed/divios/400/225', followers: '8.5K' },
];

const OFFLINE_FOLLOWED = [
  { id: '101', name: 'Asmongold', title: 'Just Chatting', lastOnline: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asmon' },
  { id: '102', name: 'Shroud', title: 'VALORANT', lastOnline: '5 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shroud' },
  { id: '103', name: 'Tenz', title: 'VALORANT', lastOnline: '1 day ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tenz' },
  { id: '104', name: 'Tarik', title: 'Counter-Strike 2', lastOnline: '3 days ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tarik' },
];

export const Following: React.FC<FollowingProps> = ({ onSelectChannel }) => {
  return (
    <div className="h-full w-full p-8 overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-4xl font-[900] text-white tracking-tighter uppercase">Following</h2>
        <div className="h-1 flex-1 bg-[#1f2128] rounded-full"></div>
      </div>

      {/* LIVE SECTION */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4">
           <Signal size={16} className="text-red-500 animate-pulse" />
           <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Live Now</h3>
        </div>
        
        {LIVE_FOLLOWED.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {LIVE_FOLLOWED.map((channel) => (
              <div 
                key={channel.id} 
                className="group cursor-pointer flex flex-col gap-3"
                onClick={() => onSelectChannel(channel)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-[#1f2128] rounded-lg overflow-hidden transition-transform duration-300 group-hover:translate-y-[-4px] shadow-lg group-hover:shadow-orange-900/10">
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

                <div className="flex gap-3">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${channel.name}`} className="w-10 h-10 rounded-full bg-[#1f2128] border border-[#2d3039]" alt="" />
                   <div className="flex flex-col min-w-0">
                      <h4 className="text-sm font-bold text-slate-200 truncate group-hover:text-orange-500 transition-colors">{channel.title}</h4>
                      <span className="text-xs font-medium text-slate-500">{channel.name}</span>
                      <span className="text-[10px] font-bold text-slate-600 mt-0.5">{channel.category}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 bg-[#1f2128] rounded-xl text-center border border-[#2d3039] flex flex-col items-center justify-center gap-4">
            <Ghost size={32} className="text-slate-600" />
            <p className="text-slate-500 font-bold text-sm">No followed channels are live right now.</p>
          </div>
        )}
      </div>

      {/* OFFLINE SECTION */}
      <div>
        <div className="flex items-center gap-2 mb-4">
           <Clock size={16} className="text-slate-500" />
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Offline Channels</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
           {OFFLINE_FOLLOWED.map(channel => (
             <div key={channel.id} className="flex items-center justify-between p-4 bg-[#181a21] border border-[#2d3039] rounded-xl hover:bg-[#1f2128] hover:border-slate-600 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                   <div className="relative grayscale group-hover:grayscale-0 transition-all duration-300">
                      <img src={channel.avatar} className="w-12 h-12 rounded-full bg-[#0f1117] border border-[#2d3039]" alt="" />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{channel.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400">
                         <Video size={12} />
                         <span>Last played {channel.title}</span>
                      </div>
                   </div>
                </div>
                <div className="text-[10px] font-bold text-slate-600 bg-[#0f1117] px-2 py-1 rounded border border-[#2d3039]">
                   {channel.lastOnline}
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};