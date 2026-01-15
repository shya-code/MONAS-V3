import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Activity, 
  Zap,
  Layout,
  Mic,
  Settings,
  Users
} from 'lucide-react';
import { LiveChat } from '../components/LiveChat';

interface StreamerDashboardProps {
  walletConnected: boolean;
  username: string;
}

export const StreamerDashboard: React.FC<StreamerDashboardProps> = ({ walletConnected, username }) => {
  const [isLive, setIsLive] = useState(false);
  const [streamType, setStreamType] = useState<'FREE' | 'VIP'>('VIP');
  const [monPerSec, setMonPerSec] = useState('0.001');
  const [streamTitle, setStreamTitle] = useState('');
  const [viewerCount, setViewerCount] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isLive) {
      // Start with initial count
      setViewerCount(12);
      // Increment viewers to simulate audience joining
      interval = setInterval(() => {
        setViewerCount(prev => prev + Math.floor(Math.random() * 5) + 2); 
      }, 2500);
    } else {
      setViewerCount(0);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="h-full w-full flex bg-[#0f1117] p-6 gap-6 overflow-hidden transition-all duration-500">
       {/* Left Sidebar Cards */}
       <div className="w-[320px] flex flex-col gap-6 flex-shrink-0 animate-text">
          
          {/* MON EARNED CARD */}
          <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6 shadow-lg relative overflow-hidden group hover:border-orange-500/50 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <DollarSign size={64} className="text-orange-500" />
             </div>
             <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest mb-2">Total Earnings</h3>
             <div className="flex items-baseline gap-1">
                <span className="text-4xl font-[900] text-white font-mono tracking-tighter">4,821.50</span>
                <span className="text-sm font-black text-orange-500">MON</span>
             </div>
             <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 w-fit px-2 py-1 rounded">
                <Activity size={12} /> +12% vs last stream
             </div>
          </div>

          {/* STREAM CONFIG CARD (FREE / VIP) */}
          <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6 shadow-lg flex flex-col gap-6">
             <div>
                <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest mb-3">Access Mode</h3>
                <div className="grid grid-cols-2 gap-2 p-1 bg-[#0f1117] rounded-lg border border-[#2d3039]">
                   <button 
                     onClick={() => setStreamType('FREE')}
                     className={`py-2 rounded-md text-[10px] font-[900] uppercase tracking-widest transition-all ${streamType === 'FREE' ? 'bg-white text-black shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                   >
                     Free
                   </button>
                   <button 
                     onClick={() => setStreamType('VIP')}
                     className={`py-2 rounded-md text-[10px] font-[900] uppercase tracking-widest transition-all ${streamType === 'VIP' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                   >
                     VIP
                   </button>
                </div>
             </div>

             {streamType === 'VIP' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                   <label className="text-[10px] font-[900] text-slate-400 uppercase tracking-widest mb-2 block">Settlement Rate</label>
                   <div className="relative group">
                      <input 
                        type="number" 
                        value={monPerSec}
                        onChange={(e) => setMonPerSec(e.target.value)}
                        className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-3 px-4 text-white font-mono font-bold focus:border-orange-500 outline-none transition-all group-hover:border-slate-600"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-500 uppercase bg-[#1f2128] px-1.5 py-0.5 rounded">
                         MON / SEC
                      </div>
                   </div>
                   <p className="mt-2 text-[9px] text-slate-500 font-medium leading-relaxed">
                      Viewers will stream payments every second to watch. 
                   </p>
                </div>
             )}
          </div>
          
          {/* LIVE VIEWERS CARD */}
          {isLive && (
             <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6 shadow-lg animate-in fade-in slide-in-from-left-4 duration-500">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest">Live Audience</h3>
                    <div className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-[9px] font-bold uppercase flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> On Air
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#0f1117] rounded-lg text-slate-200 border border-[#2d3039]">
                       <Users size={24} className="text-orange-500" />
                    </div>
                    <div>
                       <div className="text-3xl font-[900] text-white font-mono tracking-tighter leading-none">
                          {viewerCount.toLocaleString()}
                       </div>
                       <div className="text-[10px] font-bold text-slate-500 mt-1">
                          Viewers Watching
                       </div>
                    </div>
                 </div>
             </div>
          )}

          <div className="mt-auto p-4 rounded-xl bg-[#1f2128] border border-[#2d3039]">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                 <Settings size={14} />
                 <span className="text-[10px] font-bold uppercase">Stream Key</span>
              </div>
              <div className="font-mono text-[10px] text-slate-600 break-all">
                 live_monad_sk_882...
              </div>
          </div>
       </div>

       {/* Center Preview Area */}
       <div className="flex-1 flex flex-col items-center justify-center bg-[#0f1117] relative">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-[#2d3039] group transition-all duration-500">
             
             {/* Preview Placeholder */}
             {isLive ? (
                 <img src="https://picsum.photos/seed/monas_stream_preview/1280/720" className="w-full h-full object-cover" alt="Preview" />
             ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[#181a21]">
                    <div className="p-4 bg-[#0f1117] rounded-full border border-[#2d3039]">
                       <Layout size={32} className="text-slate-600" />
                    </div>
                    <span className="text-xs font-[900] text-slate-500 uppercase tracking-[0.2em]">Preview_Offline</span>
                 </div>
             )}

             {/* Start Stream Button (Top Right) */}
             <div className="absolute top-6 right-6 z-10">
                <button 
                  onClick={() => setIsLive(!isLive)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-[900] text-xs uppercase tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 ${
                    isLive 
                      ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/20' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-900/20'
                  }`}
                >
                   {isLive ? (
                     <>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> End Stream
                     </>
                   ) : (
                     <>
                        <Zap size={16} fill="currentColor" /> Start Stream
                     </>
                   )}
                </button>
             </div>
             
             {/* Overlays for Realism */}
             <div className="absolute bottom-6 left-6 flex gap-3 pointer-events-none">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-white text-[10px] font-bold">
                   1080p 60FPS
                </div>
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-white text-[10px] font-bold flex items-center gap-2">
                   <Mic size={12} /> Source: Default
                </div>
             </div>

          </div>

          {/* Stream Title Input */}
          <div className="w-full max-w-5xl mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <input 
               type="text" 
               value={streamTitle}
               onChange={(e) => setStreamTitle(e.target.value)}
               placeholder="Enter the stream title"
               className="w-full bg-[#181a21] border border-[#2d3039] rounded-xl py-4 px-6 text-white text-lg font-bold placeholder-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all shadow-lg"
             />
          </div>
       </div>

       {/* Right Live Chat Area - Conditional */}
       {isLive && (
         <div className="w-[320px] flex-shrink-0 bg-[#0f1117] border border-[#2d3039] rounded-xl overflow-hidden animate-in slide-in-from-right-10 fade-in duration-500 flex flex-col">
            <LiveChat username={username} isStreamer={true} />
         </div>
       )}
    </div>
  );
};