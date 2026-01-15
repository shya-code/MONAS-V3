import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  Download, 
  ChevronDown, 
  CreditCard, 
  Wallet,
  ArrowUpRight,
  Activity,
  BarChart2,
  PieChart as PieIcon,
  Flame,
  MessageSquare,
  Eye,
  Trophy,
  Star,
  Video,
  Play
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface CreatorStudioProps {
  walletConnected: boolean;
  username: string;
}

const EARNINGS_DATA = [
  { date: 'Nov 1', amount: 45 },
  { date: 'Nov 5', amount: 120 },
  { date: 'Nov 10', amount: 85 },
  { date: 'Nov 15', amount: 210 },
  { date: 'Nov 20', amount: 160 },
  { date: 'Nov 25', amount: 290 },
  { date: 'Nov 30', amount: 340 },
];

const VIEWER_DATA = [
  { day: 'Mon', viewers: 120 },
  { day: 'Tue', viewers: 150 },
  { day: 'Wed', viewers: 180 },
  { day: 'Thu', viewers: 140 },
  { day: 'Fri', viewers: 250 },
  { day: 'Sat', viewers: 380 },
  { day: 'Sun', viewers: 310 },
];

const STREAM_HISTORY = [
  { id: 1, title: 'Speedrunning Monad Chess', date: '2024-11-28', duration: '4h 12m', viewers: '12.4K', earnings: 145.20 },
  { id: 2, title: 'Late Night Chill & Code', date: '2024-11-26', duration: '2h 30m', viewers: '3.1K', earnings: 42.50 },
  { id: 3, title: 'Protocol Review + AMA', date: '2024-11-24', duration: '1h 45m', viewers: '8.5K', earnings: 98.00 },
  { id: 4, title: 'Gaming Weekend Marathon', date: '2024-11-20', duration: '6h 00m', viewers: '15.2K', earnings: 210.80 },
];

const TOP_FANS_DATA = {
  donors: [
    { name: '0xAlpha_Nodes', value: '2,450 MON', tier: 'Diamond', avatar: 'Alpha' },
    { name: 'MonadWhale', value: '1,820 MON', tier: 'Platinum', avatar: 'Whale' },
    { name: 'GigaStreamer', value: '900 MON', tier: 'Gold', avatar: 'Giga' },
    { name: 'CryptoFan_99', value: '450 MON', tier: 'Silver', avatar: 'Fan' },
  ],
  watchtime: [
    { name: 'Lurker_Pro', value: '142 Hrs', tier: 'Diamond', avatar: 'Lurker' },
    { name: 'NightOwl_88', value: '98 Hrs', tier: 'Platinum', avatar: 'Owl' },
    { name: 'AlwaysOn', value: '76 Hrs', tier: 'Gold', avatar: 'On' },
    { name: 'SecondMonitor', value: '45 Hrs', tier: 'Silver', avatar: 'Monitor' },
  ],
  chat: [
    { name: 'ChatSpammer', value: '12.5K Msgs', tier: 'Diamond', avatar: 'Spam' },
    { name: 'Mod_Wannabe', value: '8.2K Msgs', tier: 'Platinum', avatar: 'Mod' },
    { name: 'QuestionGuy', value: '5.1K Msgs', tier: 'Gold', avatar: 'Guy' },
    { name: 'HypeMan', value: '3.4K Msgs', tier: 'Silver', avatar: 'Hype' },
  ]
};

export const CreatorStudio: React.FC<CreatorStudioProps> = ({ walletConnected, username }) => {
  const [activeTab, setActiveTab] = useState<'payouts' | 'analytics'>('payouts');
  const [fanCategory, setFanCategory] = useState<'donors' | 'watchtime' | 'chat'>('donors');
  const [isClaiming, setIsClaiming] = useState(false);
  const [balance, setBalance] = useState(1240.50);

  const handleClaim = () => {
    if (!walletConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    setIsClaiming(true);
    setTimeout(() => {
      setBalance(0);
      setIsClaiming(false);
      alert("Successfully claimed earnings to your wallet!");
    }, 2000);
  };

  return (
    <div className="h-full w-full bg-[#0f1117] overflow-y-auto no-scrollbar p-6 md:p-10">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
         <div>
            <h1 className="text-3xl font-[900] text-white tracking-tighter uppercase mb-2">Creator Studio</h1>
            <p className="text-slate-400 text-sm font-medium">Manage your monetization and audience insights.</p>
         </div>
         
         <div className="flex bg-[#181a21] p-1 rounded-lg border border-[#2d3039]">
            <button 
              onClick={() => setActiveTab('payouts')}
              className={`px-6 py-2 rounded-md text-xs font-[900] uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'payouts' ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
               <CreditCard size={14} /> Payouts
            </button>
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-2 rounded-md text-xs font-[900] uppercase tracking-wider transition-all flex items-center gap-2 ${activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
               <BarChart2 size={14} /> Analytics
            </button>
         </div>
      </div>

      {activeTab === 'payouts' ? (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
           
           {/* Section 1: Balance & Claims */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Balance Card */}
              <div className="lg:col-span-2 bg-gradient-to-br from-[#181a21] to-[#0f1117] border border-[#2d3039] rounded-xl p-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Wallet size={120} />
                 </div>
                 
                 <div className="relative z-10">
                    <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest mb-4">Available Balance</h3>
                    <div className="flex items-end gap-2 mb-8">
                       <span className="text-6xl font-[900] text-white font-mono tracking-tighter">{balance.toFixed(2)}</span>
                       <span className="text-xl font-bold text-orange-500 mb-3">MON</span>
                    </div>

                    <div className="flex items-center gap-4">
                       <button 
                         onClick={handleClaim}
                         disabled={isClaiming || balance <= 0}
                         className={`px-8 py-3 rounded-lg font-[900] text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${
                            isClaiming 
                              ? 'bg-[#2d3039] text-slate-400 cursor-wait' 
                              : balance > 0 
                                ? 'bg-white text-black hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                                : 'bg-[#2d3039] text-slate-500 cursor-not-allowed'
                         }`}
                       >
                          {isClaiming ? 'Processing...' : 'Claim to Wallet'} <ArrowUpRight size={16} />
                       </button>
                       {!walletConnected && (
                          <span className="text-xs text-red-500 font-bold bg-red-500/10 px-3 py-1.5 rounded-md border border-red-500/20">
                             Wallet Not Connected
                          </span>
                       )}
                    </div>
                 </div>
              </div>

              {/* Stats Column */}
              <div className="space-y-6">
                 <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                          <DollarSign size={20} />
                       </div>
                       <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest">Lifetime Earnings</h3>
                    </div>
                    <div className="text-2xl font-[900] text-white font-mono tracking-tighter">15,420.00 MON</div>
                 </div>

                 <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                          <Calendar size={20} />
                       </div>
                       <h3 className="text-xs font-[900] text-slate-400 uppercase tracking-widest">Last Payout</h3>
                    </div>
                    <div className="text-2xl font-[900] text-white font-mono tracking-tighter">500.00 MON</div>
                    <div className="text-xs font-bold text-slate-500 mt-1">Processed on Oct 24, 2024</div>
                 </div>
              </div>
           </div>

           {/* Stream History Table */}
           <div className="bg-[#181a21] border border-[#2d3039] rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#2d3039] flex justify-between items-center">
                 <h3 className="text-sm font-[900] text-white uppercase tracking-widest">Stream Revenue History</h3>
                 <button className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1">
                    <Download size={14} /> Export CSV
                 </button>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-[#1f2128] text-xs font-[900] text-slate-500 uppercase tracking-wider">
                       <tr>
                          <th className="px-6 py-3">Date</th>
                          <th className="px-6 py-3">Stream Title</th>
                          <th className="px-6 py-3">Duration</th>
                          <th className="px-6 py-3">Stats</th>
                          <th className="px-6 py-3 text-right">Revenue (MON)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2d3039]">
                       {STREAM_HISTORY.map((stream) => (
                          <tr key={stream.id} className="text-sm font-medium text-slate-300 hover:bg-[#1f2128] transition-colors">
                             <td className="px-6 py-4 font-mono text-xs">{stream.date}</td>
                             <td className="px-6 py-4 font-bold text-white">{stream.title}</td>
                             <td className="px-6 py-4 text-xs text-slate-400">{stream.duration}</td>
                             <td className="px-6 py-4">
                                <span className="flex items-center gap-1.5 text-xs">
                                   <Users size={12} className="text-blue-500" /> {stream.viewers}
                                </span>
                             </td>
                             <td className="px-6 py-4 text-right font-mono font-bold text-green-400">
                                +{stream.earnings.toFixed(2)}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
           
           {/* Section 2: Fan Insights & Analytics */}
           
           {/* KPI Cards Row */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 flex items-start justify-between group hover:border-blue-500/50 transition-all">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Views</h3>
                    <div className="text-3xl font-[900] text-white font-mono tracking-tighter">842.5K</div>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
                       <TrendingUp size={10} /> +12.5% vs last month
                    </span>
                 </div>
                 <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                    <Eye size={20} />
                 </div>
              </div>
              
              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 flex items-start justify-between group hover:border-purple-500/50 transition-all">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Total Watchtime</h3>
                    <div className="text-3xl font-[900] text-white font-mono tracking-tighter">12.4K</div>
                    <span className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Hours</span>
                 </div>
                 <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                    <Clock size={20} />
                 </div>
              </div>

              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 flex items-start justify-between group hover:border-emerald-500/50 transition-all">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Avg. Watchtime</h3>
                    <div className="text-3xl font-[900] text-white font-mono tracking-tighter">18m 42s</div>
                    <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
                       <Activity size={10} /> +2m vs last month
                    </span>
                 </div>
                 <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <Play size={20} />
                 </div>
              </div>

              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-5 flex items-start justify-between group hover:border-orange-500/50 transition-all">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Avg. Hype / Stream</h3>
                    <div className="text-3xl font-[900] text-white font-mono tracking-tighter">1,240</div>
                    <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1 mt-1">
                       <Flame size={10} /> Top 5% of Protocol
                    </span>
                 </div>
                 <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                    <Flame size={20} />
                 </div>
              </div>
           </div>

           {/* Performance Charts */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-[900] text-white uppercase tracking-widest flex items-center gap-2">
                       <TrendingUp size={16} className="text-green-500" /> Revenue Trend (30 Days)
                    </h3>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={EARNINGS_DATA}>
                          <defs>
                             <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2d3039" vertical={false} />
                          <XAxis dataKey="date" stroke="#64748b" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                          <YAxis stroke="#64748b" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} tickFormatter={(value) => `${value} M`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#181a21', borderColor: '#2d3039', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                            itemStyle={{ color: '#f97316' }}
                          />
                          <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-[900] text-white uppercase tracking-widest flex items-center gap-2">
                       <Users size={16} className="text-blue-500" /> Weekly Viewership
                    </h3>
                 </div>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={VIEWER_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2d3039" vertical={false} />
                          <XAxis dataKey="day" stroke="#64748b" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                          <YAxis stroke="#64748b" tick={{fontSize: 10, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#181a21', borderColor: '#2d3039', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', color: '#fff' }}
                            cursor={{fill: '#2d3039', opacity: 0.4}}
                          />
                          <Bar dataKey="viewers" radius={[4, 4, 0, 0]}>
                             {VIEWER_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#60a5fa'} />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Best Performing Stream & Fan Categories */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Best Stream Card */}
              <div className="bg-[#181a21] border border-[#2d3039] rounded-xl overflow-hidden flex flex-col">
                 <div className="p-6 border-b border-[#2d3039]">
                    <h3 className="text-xs font-[900] text-white uppercase tracking-widest flex items-center gap-2">
                       <Trophy size={16} className="text-yellow-500" /> Best Performing Stream
                    </h3>
                 </div>
                 <div className="relative aspect-video">
                    <img src="https://picsum.photos/seed/beststream/800/450" className="w-full h-full object-cover opacity-80" alt="Best Stream" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#181a21] to-transparent"></div>
                    <div className="absolute bottom-4 left-6">
                       <h4 className="text-lg font-bold text-white mb-1">Speedrunning Monad Chess</h4>
                       <span className="text-xs font-medium text-slate-400">Streamed on Nov 28, 2024</span>
                    </div>
                 </div>
                 <div className="p-6 grid grid-cols-3 gap-4">
                    <div className="text-center">
                       <div className="text-xs font-bold text-slate-500 mb-1">Peak Viewers</div>
                       <div className="text-xl font-[900] text-white">12.4K</div>
                    </div>
                    <div className="text-center border-x border-[#2d3039]">
                       <div className="text-xs font-bold text-slate-500 mb-1">Total Hype</div>
                       <div className="text-xl font-[900] text-orange-500 flex items-center justify-center gap-1">
                          <Flame size={14} fill="currentColor" /> 15.2K
                       </div>
                    </div>
                    <div className="text-center">
                       <div className="text-xs font-bold text-slate-500 mb-1">Earnings</div>
                       <div className="text-xl font-[900] text-emerald-500">145.2 M</div>
                    </div>
                 </div>
              </div>

              {/* Fan Leaderboard Section (Spans 2 cols) */}
              <div className="lg:col-span-2 bg-[#181a21] border border-[#2d3039] rounded-xl p-6 flex flex-col">
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <h3 className="text-xs font-[900] text-white uppercase tracking-widest flex items-center gap-2">
                       <Star size={16} className="text-purple-500" /> Community Champions
                    </h3>
                    
                    {/* Category Switcher */}
                    <div className="flex bg-[#0f1117] p-1 rounded-lg border border-[#2d3039] self-start sm:self-auto">
                       <button 
                         onClick={() => setFanCategory('donors')}
                         className={`px-3 py-1.5 rounded-md text-[10px] font-[900] uppercase tracking-wider transition-all flex items-center gap-2 ${fanCategory === 'donors' ? 'bg-[#2d3039] text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                       >
                          <DollarSign size={12} /> Top Donors
                       </button>
                       <button 
                         onClick={() => setFanCategory('watchtime')}
                         className={`px-3 py-1.5 rounded-md text-[10px] font-[900] uppercase tracking-wider transition-all flex items-center gap-2 ${fanCategory === 'watchtime' ? 'bg-[#2d3039] text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                       >
                          <Clock size={12} /> Most Loyal
                       </button>
                       <button 
                         onClick={() => setFanCategory('chat')}
                         className={`px-3 py-1.5 rounded-md text-[10px] font-[900] uppercase tracking-wider transition-all flex items-center gap-2 ${fanCategory === 'chat' ? 'bg-[#2d3039] text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                       >
                          <MessageSquare size={12} /> Chattiest
                       </button>
                    </div>
                 </div>

                 <div className="space-y-3 flex-grow">
                    {TOP_FANS_DATA[fanCategory].map((fan, idx) => (
                       <div key={idx} className="flex items-center justify-between p-4 bg-[#1f2128] rounded-lg border border-[#2d3039] hover:border-slate-500 transition-colors group">
                          <div className="flex items-center gap-4">
                             <div className={`
                                w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold text-sm
                                ${idx === 0 ? 'bg-yellow-500 text-black' : idx === 1 ? 'bg-slate-300 text-black' : idx === 2 ? 'bg-orange-700 text-white' : 'bg-[#2d3039] text-slate-500'}
                             `}>
                                #{idx + 1}
                             </div>
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${fan.avatar}`} className="w-10 h-10 rounded-full bg-[#0f1117] border border-[#2d3039]" alt="" />
                             <div>
                                <div className="text-sm font-bold text-white group-hover:text-orange-500 transition-colors">{fan.name}</div>
                                <div className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded w-fit mt-1 ${
                                   fan.tier === 'Diamond' ? 'bg-cyan-900/50 text-cyan-400' : 
                                   fan.tier === 'Platinum' ? 'bg-slate-700 text-slate-300' :
                                   fan.tier === 'Gold' ? 'bg-yellow-900/50 text-yellow-400' : 'bg-slate-800 text-slate-500'
                                }`}>{fan.tier} Tier</div>
                             </div>
                          </div>
                          <div className="text-right">
                             <div className="font-mono font-black text-white text-base">{fan.value}</div>
                             <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                                {fanCategory === 'donors' ? 'Contributed' : fanCategory === 'watchtime' ? 'Watched' : 'Messages'}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

           </div>

        </div>
      )}
    </div>
  );
};