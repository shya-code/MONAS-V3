import React, { useState, useEffect, useRef } from 'react';
import { LiveChat } from '../components/LiveChat';
import { 
  Pause, Play, Heart, Share2, MoreVertical, Zap, Activity, 
  ShieldCheck, Loader2, Flame, FlameKindling, ArrowRight,
  CircleStop, Star, DollarSign, Users, Info, Globe, Twitter, Github, CheckCircle2
} from 'lucide-react';
import { Channel } from '../types';

interface ViewerRoomProps {
  walletConnected: boolean;
  username: string;
  channel: Channel;
  onBack: () => void;
}

export const ViewerRoom: React.FC<ViewerRoomProps> = ({ walletConnected, username, channel, onBack }) => {
  const [isStreaming, setIsStreaming] = useState(true);
  const [accumulatedSettlement, setAccumulatedSettlement] = useState(0);
  const [hypeCount, setHypeCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isIgniting, setIsIgniting] = useState(false);
  const [showFireEffect, setShowFireEffect] = useState(false);
  const [screenShake, setScreenShake] = useState(false);
  const [customAmount, setCustomAmount] = useState('5');
  const fireTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const RATE_PER_SECOND = 0.06;

  useEffect(() => {
    let interval: any;
    if (isStreaming && walletConnected) {
      interval = setInterval(() => {
        setAccumulatedSettlement(prev => prev + RATE_PER_SECOND);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStreaming, walletConnected]);

  const handleSuperIgnite = () => {
    if (!walletConnected) {
      alert("Connect protocol wallet to authorize Super Ignite.");
      return;
    }
    const amount = parseFloat(customAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid MON amount.");
      return;
    }

    setIsIgniting(true);
    
    // Simulate transaction delay (slightly faster for responsiveness)
    setTimeout(() => {
      setIsIgniting(false);
      setShowFireEffect(true);
      setScreenShake(true); // Trigger heavy screen shake
      setCustomAmount(''); // Clear input
      
      // Stop shaking after impact
      setTimeout(() => setScreenShake(false), 500);
      
      if (fireTimeoutRef.current) clearTimeout(fireTimeoutRef.current);
      
      fireTimeoutRef.current = setTimeout(() => {
        setShowFireEffect(false);
      }, 4000);
    }, 1200);
  };

  return (
    <div className={`w-full h-full flex flex-col md:flex-row bg-[#0f1117] overflow-hidden relative ${screenShake ? 'animate-shake' : ''}`}>
      {/* Fire Animation Overlay - Enhanced */}
      {showFireEffect && (
        <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden fade-enter-active">
          {/* Flashbang effect */}
          <div className="absolute inset-0 bg-white animate-flash mix-blend-overlay"></div>
          
          <div className="fire-container">
            <div className="fire-base"></div>
            {[...Array(40)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${0.5 + Math.random()}s`, // Faster particles
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                background: Math.random() > 0.5 ? '#f97316' : '#ef4444' // Varied colors
              }}></div>
            ))}
          </div>
          <div className="absolute inset-0 bg-orange-600/20 mix-blend-overlay animate-pulse"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-[110]">
             <div className="text-white font-[900] text-7xl md:text-9xl italic tracking-tighter uppercase drop-shadow-[0_0_50px_#f97316] animate-slam whitespace-nowrap transform rotate-[-5deg]">
               SUPER IGNITE!
             </div>
             <div className="mt-8 text-xl md:text-2xl font-bold text-yellow-200 tracking-[1em] uppercase bg-black/60 px-8 py-3 rounded-full backdrop-blur-md border border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.5)] animate-fade-up">
               Protocol Burn Confirmed
             </div>
          </div>
        </div>
      )}

      {/* Main Content (Video + Info) - Scrollable */}
      <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar">
        
        {/* Video Player Area */}
        <div className="w-full aspect-video bg-black relative group shadow-2xl">
          {isStreaming ? (
            <img 
              src={channel.thumbnail.replace('400/225', '1920/1080')} 
              className="w-full h-full object-cover opacity-90" 
              alt="stream" 
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-700">
               <CircleStop size={64} className="animate-pulse" />
               <span className="text-sm font-black uppercase tracking-[0.4em]">Stream_Offline</span>
            </div>
          )}
          
          {/* Overlays */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="bg-red-600 text-white text-[10px] font-[900] px-2 py-1 rounded tracking-widest uppercase flex items-center gap-2 shadow-lg">
               LIVE
            </div>
            <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
               <Users size={12} /> {channel.viewers}
            </div>
          </div>
          
          {/* Player Controls Overlay (Visible on Hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end">
             <div className="flex items-center gap-4 text-white">
                <button onClick={() => setIsStreaming(!isStreaming)}>
                  {isStreaming ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                </button>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                   <span className="text-xs font-bold uppercase tracking-wider">Live Sync</span>
                </div>
             </div>
          </div>
        </div>

        {/* Info & Monad Modules Area */}
        <div className="p-6 space-y-6">
          
          {/* Stream Header Info */}
          <div className="flex items-start justify-between gap-4">
             <div className="flex gap-4">
                <div className="relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${channel.name}`} className="w-16 h-16 rounded-full border-2 border-[#2d3039]" alt="" />
                   <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[8px] font-black px-1.5 rounded-sm uppercase">Live</div>
                </div>
                <div>
                   <h1 className="text-xl font-bold text-white mb-1">{channel.title}</h1>
                   <div className="flex items-center gap-2 mb-2">
                      <span className="text-orange-500 font-bold text-sm">{channel.name}</span>
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-slate-500 text-xs font-medium">{channel.category}</span>
                   </div>
                   <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-[#1f2128] text-slate-400 text-[10px] font-bold">English</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#1f2128] text-slate-400 text-[10px] font-bold">Monad</span>
                   </div>
                </div>
             </div>

             <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-lg text-xs font-[900] uppercase tracking-wider transition-all ${
                    isFollowing ? 'bg-[#2d3039] text-slate-300' : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button 
                   onClick={() => setHypeCount(c => c+1)}
                   className="p-2 bg-[#1f2128] text-orange-500 rounded-lg hover:bg-[#2d3039] border border-[#2d3039]"
                >
                   <Heart size={20} className={hypeCount > 0 ? "fill-orange-500" : ""} />
                </button>
                <button className="p-2 bg-[#1f2128] text-slate-400 rounded-lg hover:bg-[#2d3039] border border-[#2d3039]">
                   <Share2 size={20} />
                </button>
             </div>
          </div>

          {/* DASHBOARD GRID: Monad Settlement & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             
             {/* LEFT: Live Settlement Card (Horizontal Layout) */}
             <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-6">
                   <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-orange-500/10 rounded">
                         <Zap size={16} className="text-orange-500 fill-orange-500" />
                      </div>
                      <span className="text-xs font-[900] text-slate-300 uppercase tracking-widest">Live Settlement</span>
                   </div>
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-500 text-[9px] font-bold uppercase">
                      <Activity size={10} /> Active
                   </div>
                </div>

                <div className="flex items-end justify-between gap-6">
                   <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">MON SPEND</div>
                      <div className="text-4xl font-[900] text-white font-mono tracking-tighter leading-none">
                         {accumulatedSettlement.toFixed(4)}
                      </div>
                   </div>
                   <div className="text-right">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Rate</div>
                      <div className="text-xl font-[900] text-orange-500 font-mono tracking-tighter leading-none">
                         {RATE_PER_SECOND}<span className="text-xs ml-1 text-orange-700">/s</span>
                      </div>
                   </div>
                </div>

                <div className="mt-6 flex gap-2">
                   <button 
                     onClick={() => setIsStreaming(!isStreaming)}
                     className={`flex-1 py-2 rounded-lg text-[10px] font-[900] uppercase tracking-widest transition-all ${
                       isStreaming 
                         ? 'bg-[#2d3039] text-slate-400 hover:text-white hover:bg-red-900/50 hover:border-red-500/50 border border-transparent' 
                         : 'bg-red-600 text-white hover:bg-red-700'
                     }`}
                   >
                     {isStreaming ? 'Pause Settlement' : 'Resume Session'}
                   </button>
                </div>
             </div>

             {/* RIGHT: Super Ignite (Donation) */}
             <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20"></div>
                
                <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center gap-2">
                      <Flame size={16} className="text-orange-500" />
                      <span className="text-xs font-[900] text-slate-300 uppercase tracking-widest">Super Ignite</span>
                   </div>
                   <div className="flex bg-[#0f1117] rounded-lg p-0.5">
                      {['5', '25', '100'].map(val => (
                        <button 
                          key={val}
                          onClick={() => setCustomAmount(val)}
                          className={`px-3 py-1 rounded text-[10px] font-mono font-bold transition-all ${
                            customAmount === val 
                              ? 'bg-slate-700 text-white' 
                              : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex gap-3">
                   <div className="relative flex-grow">
                      <input 
                        type="number" 
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full h-10 bg-[#0f1117] border border-[#2d3039] rounded-lg px-3 text-white font-mono text-sm font-bold focus:border-orange-500 outline-none"
                        placeholder="0.00"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-500 uppercase">MON</span>
                   </div>
                   <button 
                     onClick={handleSuperIgnite}
                     disabled={isIgniting}
                     className={`
                       relative overflow-hidden group
                       bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-[length:200%_auto]
                       text-white px-4 rounded-lg font-[900] text-xs uppercase tracking-widest
                       flex items-center justify-center min-w-[120px] h-10
                       transition-all duration-100 ease-out
                       ${isIgniting ? 'opacity-80 cursor-wait' : 'hover:scale-105 active:scale-95 animate-gradient-x shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.8)]'}
                     `}
                   >
                     {isIgniting ? (
                        <div className="flex items-center gap-2">
                           <Loader2 size={16} className="animate-spin" />
                           <span>IGNITING...</span>
                        </div>
                     ) : (
                        <div className="flex items-center gap-2 relative z-10">
                           <Flame size={16} className="fill-white animate-pulse" />
                           <span>IGNITE</span>
                        </div>
                     )}
                     
                     {/* Shine effect overlay */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine"></div>
                   </button>
                </div>
                <p className="mt-3 text-[9px] text-slate-500 font-medium">
                   Sending ignites burns 100% of protocol fees to the streamer instantly.
                </p>
             </div>
          </div>
          
          {/* About Section */}
          <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <Info size={20} className="text-slate-400" />
                 <h3 className="text-sm font-[900] text-white uppercase tracking-[0.2em]">About {channel.name}</h3>
              </div>
              <div className="flex items-center gap-2 bg-[#0f1117] border border-[#2d3039] px-3 py-1.5 rounded-full">
                 <Users size={14} className="text-slate-400" />
                 <span className="text-xs font-bold text-slate-300">{channel.followers || '128.4K'} FOLLOWERS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column: Bio & Links */}
              <div className="lg:col-span-2 flex flex-col justify-between">
                 <p className="text-slate-300 text-sm leading-7 font-medium">
                    Welcome to my transmission node. I'm a full-time content producer specialized in {channel.category}. 
                    Streaming live on the Monad network to ensure parallelized, per-second micro-settlements for my audience. 
                    Join the stream, interact with the polls, and let's build the future of decentralized entertainment together.
                 </p>
                 
                 <div className="flex items-center gap-6 mt-8 border-t border-[#2d3039] pt-6">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider">
                       <Globe size={16} /> Website
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-wider">
                       <Twitter size={16} /> Twitter
                    </button>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-wider">
                       <Github size={16} /> Github
                    </button>
                 </div>
              </div>

              {/* Right Column: Stats Card */}
              <div className="bg-[#0f1117] border border-[#2d3039] rounded-lg p-6">
                 <h4 className="text-[10px] font-[900] text-slate-500 uppercase tracking-widest mb-6">Node Stats</h4>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400">Protocol Rank</span>
                       <span className="text-xs font-[900] text-white">TOP 1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400">Followers</span>
                       <span className="text-xs font-[900] text-white">{channel.followers || '128.4K'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400">Settlement Volume</span>
                       <span className="text-xs font-[900] text-emerald-500">1.2M MON</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-xs font-bold text-slate-400">Active Since</span>
                       <span className="text-xs font-[900] text-white">BLOCK #8292</span>
                    </div>
                 </div>

                 <div className="mt-6 pt-4 border-t border-[#2d3039]">
                    <div className="flex items-center gap-2 text-[9px] font-[900] text-slate-500 uppercase tracking-widest">
                       <CheckCircle2 size={12} className="text-blue-500" /> Verified_Transmission_Partner
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Sidebar - Chat (Collapsible on mobile) */}
      <div className="w-[340px] flex-shrink-0 bg-[#0f1117] border-l border-[#2d3039] hidden lg:flex flex-col">
        <LiveChat username={username} />
      </div>

      <style>{`
        .fire-container {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          background: radial-gradient(circle at 50% 100%, rgba(249, 115, 22, 0.4) 0%, transparent 60%);
        }
        .fire-base {
          position: absolute;
          bottom: -50px;
          width: 120%;
          height: 100px;
          background: #f97316;
          filter: blur(50px);
          opacity: 0.6;
          animation: flicker 0.2s infinite alternate;
        }
        .particle {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          opacity: 0;
          animation: rise 3s infinite ease-out;
          filter: blur(8px);
        }
        @keyframes rise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.2); opacity: 0; }
        }
        @keyframes flicker {
          0% { opacity: 0.6; transform: scaleY(1); }
          100% { opacity: 0.8; transform: scaleY(1.1); }
        }
        
        /* SHAKE & FLASH */
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        @keyframes flash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-flash {
          animation: flash 0.5s ease-out forwards;
        }

        /* TEXT IMPACT */
        @keyframes slam {
            0% { transform: scale(3) rotate(-10deg); opacity: 0; }
            50% { transform: scale(1) rotate(-5deg); opacity: 1; }
            70% { transform: scale(1.1) rotate(-5deg); }
            100% { transform: scale(1) rotate(-5deg); }
        }
        .animate-slam {
            animation: slam 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* BUTTON GRADIENT */
        @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
            animation: gradient-x 2s linear infinite;
        }
        @keyframes shine {
            100% { transform: translateX(100%); }
        }
        .animate-shine {
            animation: shine 1s;
        }
      `}</style>
    </div>
  );
};