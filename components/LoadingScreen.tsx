import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onFinished: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 45);

    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 2500);
    const t3 = setTimeout(() => onFinished(), 5500);

    return () => {
      clearInterval(interval);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 opacity-20">
         <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full animate-pulse"></div>
         <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-white/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-md px-10">
         {/* Logo Animation */}
         <div className="flex flex-col items-center gap-4">
           <div className={`w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-1000 ${phase > 0 ? 'scale-110 rotate-0' : 'scale-75 rotate-12 opacity-0'}`}>
              <span className="text-slate-950 text-4xl font-[900] tracking-tighter">M</span>
           </div>
           <div className={`flex flex-col items-center transition-all duration-700 ${phase > 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-2xl font-[900] text-white tracking-[0.3em] uppercase">Monas Protocol</span>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.5em] mt-2">Liquid Streaming Architecture</span>
           </div>
         </div>

         {/* Progress Section */}
         <div className="w-full space-y-4">
            <div className="flex justify-between items-end">
               <div className="flex flex-col">
                  <span className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Status</span>
                  <span className="text-[10px] font-bold text-orange-500 uppercase">Init_Handshake...</span>
               </div>
               <span className="text-xl font-mono font-black text-white">{progress}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
               <div 
                 className="h-full bg-orange-500 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                 style={{ width: `${progress}%` }}
               ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 opacity-30">
               <div className="flex flex-col gap-1">
                  <span className="text-[7px] font-black text-white uppercase tracking-tighter">Sector_Sync</span>
                  <div className="h-[1px] w-full bg-white/20"></div>
               </div>
               <div className="flex flex-col gap-1">
                  <span className="text-[7px] font-black text-white uppercase tracking-tighter">Nodes_Online</span>
                  <div className="h-[1px] w-full bg-white/20"></div>
               </div>
            </div>
         </div>
      </div>

      {/* Decorative vertical text */}
      <div className="absolute top-1/2 -translate-y-1/2 left-10 text-white/5 font-black text-[12px] uppercase tracking-[1em] [writing-mode:vertical-lr] select-none">
        PARALLEL_EXECUTION_MODE
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-10 text-white/5 font-black text-[12px] uppercase tracking-[1em] [writing-mode:vertical-lr] select-none">
        BLOCK_FINALITY_SYNCED
      </div>
    </div>
  );
};