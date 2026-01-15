import React from 'react';
import { 
  Users, 
  DollarSign, 
  Radio, 
  Eye, 
  Flame, 
  Zap, 
  Clock, 
  Trophy, 
  Target, 
  Award,
  Crown,
  Medal,
  TrendingUp
} from 'lucide-react';

interface AchievementsProps {
  username: string;
}

interface AchievementCardProps {
  title: string;
  value: string | number;
  target: string | number;
  icon: React.ReactNode;
  color: string;
  subtext: string;
  progress: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ title, value, target, icon, color, subtext, progress }) => (
  <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 relative overflow-hidden group hover:border-slate-500 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
      {icon}
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg bg-opacity-10 ${color.replace('text-', 'bg-')} ${color}`}>
          {icon}
        </div>
        <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest">{title}</h3>
      </div>

      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-[900] text-white font-mono tracking-tighter">{value}</span>
        <span className="text-xs font-bold text-slate-500 mb-1">/ {target}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-[#0f1117] rounded-full overflow-hidden mb-3">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`} 
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>

      <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
        <Target size={10} /> {subtext}
      </p>
    </div>
  </div>
);

export const Achievements: React.FC<AchievementsProps> = ({ username }) => {
  return (
    <div className="h-full w-full bg-[#0f1117] overflow-y-auto no-scrollbar p-6 md:p-10">
      
      {/* Header */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
         <h1 className="text-3xl font-[900] text-white tracking-tighter uppercase mb-2">Achievements</h1>
         <p className="text-slate-400 text-sm font-medium">Track your milestones and unlock rewards across the Monas ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* SECTION 1: STREAMING ACHIEVEMENTS */}
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
          <div className="flex items-center gap-3 border-b border-[#2d3039] pb-4">
            <Radio size={20} className="text-orange-500" />
            <h2 className="text-lg font-[900] text-white uppercase tracking-wider">Streaming Milestones</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AchievementCard 
              title="Community Size"
              value="12.4K"
              target="15K"
              icon={<Users size={32} />}
              color="text-blue-500"
              subtext="2.6K more for 'Influencer' Badge"
              progress={82}
            />
            <AchievementCard 
              title="Lifetime Revenue"
              value="15.4K"
              target="20K"
              icon={<DollarSign size={32} />}
              color="text-emerald-500"
              subtext="4.6K MON to next payout tier"
              progress={77}
            />
            <AchievementCard 
              title="Hours Streamed"
              value="842"
              target="1,000"
              icon={<Radio size={32} />}
              color="text-purple-500"
              subtext="158h to 'Veteran Broadcaster'"
              progress={84}
            />
            <AchievementCard 
              title="Audience Watchtime"
              value="128K"
              target="150K"
              icon={<Eye size={32} />}
              color="text-cyan-500"
              subtext="Total hours viewed by fans"
              progress={85}
            />
          </div>

          {/* Special Streak Card */}
          <div className="bg-gradient-to-r from-orange-900/20 to-[#181a21] border border-orange-500/30 rounded-xl p-6 flex items-center justify-between relative overflow-hidden group">
             <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                   <Flame size={20} className="text-orange-500 fill-orange-500 animate-pulse" />
                   <h3 className="text-sm font-[900] text-orange-500 uppercase tracking-widest">Streaming Streak</h3>
                </div>
                <div className="text-4xl font-[900] text-white font-mono tracking-tighter">14 Days</div>
                <p className="text-xs text-slate-400 font-bold mt-1">Keep it up! 7 more days for 1.5x Multiplier.</p>
             </div>
             <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                 {/* Circular Progress Placeholder */}
                 <div className="w-20 h-20 rounded-full border-4 border-[#2d3039] flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent border-l-transparent rotate-45"></div>
                    <Flame size={32} className="text-white" />
                 </div>
             </div>
          </div>
        </div>

        {/* SECTION 2: VIEWING ACHIEVEMENTS */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 delay-200">
          <div className="flex items-center gap-3 border-b border-[#2d3039] pb-4">
            <Trophy size={20} className="text-yellow-500" />
            <h2 className="text-lg font-[900] text-white uppercase tracking-wider">Viewing Legacy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AchievementCard 
              title="Protocol Support"
              value="4,250"
              target="5,000"
              icon={<Zap size={32} />}
              color="text-yellow-500"
              subtext="MON Donated via Ignites"
              progress={85}
            />
            <AchievementCard 
              title="Time Consumed"
              value="1,240"
              target="1,500"
              icon={<Clock size={32} />}
              color="text-pink-500"
              subtext="Hours spent watching streams"
              progress={82}
            />
          </div>

          {/* Fanometer & Rank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {/* Global Rank */}
             <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent"></div>
                <Crown size={48} className="text-indigo-400 mb-4" />
                <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest mb-1">Global Viewer Rank</h3>
                <div className="text-3xl font-[900] text-white font-mono tracking-tighter mb-2">#842</div>
                <div className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                   Top 0.5%
                </div>
             </div>

             {/* Fanometer Gauge */}
             <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6 flex flex-col items-center justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent"></div>
                <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest mb-4 w-full text-center">Fanometer</h3>
                
                {/* Gauge Visual */}
                <div className="relative w-full h-32 flex items-end justify-center pb-2">
                   <div className="w-48 h-24 bg-[#0f1117] rounded-t-full relative overflow-hidden border-t-8 border-l-8 border-r-8 border-[#2d3039]">
                      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-red-600 to-transparent opacity-20"></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-white origin-bottom rotate-45 transition-transform duration-1000" style={{ transform: 'translateX(-50%) rotate(65deg)' }}></div>
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
                   </div>
                   
                   <div className="absolute bottom-6 font-[900] text-2xl text-white italic">ULTRA FAN</div>
                </div>
                
                <p className="text-[10px] text-slate-500 font-bold">Your engagement level is legendary!</p>
             </div>
          </div>
          
          {/* Badge Showcase */}
          <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
             <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Medal size={14} /> Earned Badges
             </h3>
             <div className="flex flex-wrap gap-4">
                {[
                   { name: 'Early Adopter', color: 'bg-orange-500' },
                   { name: 'Big Spender', color: 'bg-yellow-500' },
                   { name: 'Night Owl', color: 'bg-purple-500' },
                   { name: 'Hype Master', color: 'bg-red-500' },
                   { name: 'Beta Tester', color: 'bg-blue-500' },
                ].map((badge, idx) => (
                   <div key={idx} className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-lg ${badge.color} bg-opacity-10 border border-current text-white flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform`}>
                         <Award size={24} className={badge.color.replace('bg-', 'text-')} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">{badge.name}</span>
                   </div>
                ))}
                
                {/* Locked Slot */}
                <div className="flex flex-col items-center gap-2 opacity-50">
                   <div className="w-12 h-12 rounded-lg bg-[#0f1117] border border-[#2d3039] flex items-center justify-center border-dashed">
                      <Target size={20} className="text-slate-600" />
                   </div>
                   <span className="text-[10px] font-bold text-slate-600">Locked</span>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};