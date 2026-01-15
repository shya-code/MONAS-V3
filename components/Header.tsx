import React, { useState, useRef, useEffect } from 'react';
import { Wallet, Search, Bell, User, MoreVertical, LogOut, Zap, Menu, Settings, Edit, LayoutDashboard, Globe, Trophy } from 'lucide-react';

interface HeaderProps {
  walletConnected: boolean;
  onConnect: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
  onSignUp: () => void;
  onLogout: () => void;
  username: string;
  onReset: () => void;
  activeView?: 'browse' | 'following' | 'edit-profile' | 'creator-studio' | 'achievements';
  onNavigate: (view: 'browse' | 'following' | 'edit-profile' | 'creator-studio' | 'achievements') => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  walletConnected, 
  onConnect, 
  isLoggedIn, 
  onLogin, 
  onSignUp,
  onLogout,
  username, 
  onReset,
  activeView,
  onNavigate
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="h-16 px-4 flex items-center justify-between bg-[#181a21] border-b border-[#0f1117] sticky top-0 z-[60] shadow-sm flex-shrink-0">
      {/* Left: Logo & Nav */}
      <div className="flex items-center gap-6 md:gap-8">
        <div 
          onClick={onReset}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-orange-500 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.4)] group-hover:rotate-12 transition-transform duration-300">
            <span className="text-white text-lg font-[900] tracking-tighter">M</span>
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-lg font-[900] tracking-tighter text-white leading-none">MONAS</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6">
           <button 
             onClick={() => onNavigate('browse')}
             className={`text-xs font-bold transition-colors uppercase tracking-wider ${activeView === 'browse' ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
           >
             Browse
           </button>
           <button 
             onClick={() => onNavigate('following')}
             className={`text-xs font-bold transition-colors uppercase tracking-wider ${activeView === 'following' ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
           >
             Following
           </button>
        </nav>
        
        <button className="lg:hidden text-slate-400">
          <Menu size={20} />
        </button>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-500 group-focus-within:text-orange-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Search channels, tags, or nodes..." 
            className="block w-full pl-10 pr-3 py-2 bg-[#0f1117] border border-[#2d3039] rounded-lg leading-5 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 sm:text-sm font-medium transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Wallet */}
        <button 
          onClick={onConnect}
          className={`hidden sm:flex h-9 px-4 rounded-lg text-[10px] font-black transition-all items-center gap-2 tracking-widest uppercase border ${
            walletConnected 
              ? 'bg-[#1f2128] text-orange-500 border-orange-500/20' 
              : 'bg-[#2d3039] text-slate-300 border-transparent hover:bg-[#3d404d]'
          }`}
        >
          <Wallet size={14} />
          {walletConnected ? '0x88...F2A' : 'Connect'}
        </button>

        <button className="p-2 text-slate-400 hover:text-white hover:bg-[#2d3039] rounded-lg transition-colors relative">
          <Bell size={20} />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#181a21]"></div>
        </button>

        {!isLoggedIn ? (
          <div className="flex items-center gap-3">
            <button onClick={onLogin} className="text-xs font-bold text-slate-300 hover:text-white transition-colors px-2">
              Login
            </button>
            <button 
              onClick={onSignUp}
              className="h-9 px-4 bg-orange-600 text-white rounded-lg text-xs font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/20"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 pl-2 relative" ref={dropdownRef}>
            <div 
              className="relative cursor-pointer group"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`} 
                alt="avatar" 
                className={`w-9 h-9 rounded-full bg-[#2d3039] border-2 transition-colors ${isDropdownOpen ? 'border-orange-500' : 'border-[#2d3039] group-hover:border-orange-500'}`}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#181a21]"></div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-64 bg-[#181a21] border border-[#2d3039] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                 {/* Header of dropdown */}
                 <div className="px-4 py-3 border-b border-[#2d3039] mb-1">
                    <p className="text-sm font-bold text-white truncate">{username}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                       <p className="text-xs text-slate-500 font-medium truncate">Online</p>
                    </div>
                 </div>

                 {/* Menu Items */}
                 <button 
                    onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigate('edit-profile');
                    }}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-300 hover:bg-[#2d3039] hover:text-white transition-colors"
                 >
                    <Edit size={16} className="text-slate-400" /> 
                    <span>Edit Profile</span>
                 </button>
                 <button 
                    onClick={() => {
                       setIsDropdownOpen(false);
                       onNavigate('creator-studio');
                    }}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-300 hover:bg-[#2d3039] hover:text-white transition-colors"
                 >
                    <LayoutDashboard size={16} className="text-slate-400" /> 
                    <span>Creator Dashboard</span>
                 </button>
                 <button 
                    onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigate('achievements');
                    }}
                    className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-300 hover:bg-[#2d3039] hover:text-white transition-colors"
                 >
                    <Trophy size={16} className="text-slate-400" /> 
                    <span>Achievements</span>
                 </button>
                 <button className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-300 hover:bg-[#2d3039] hover:text-white transition-colors">
                    <Settings size={16} className="text-slate-400" /> 
                    <span>Settings</span>
                 </button>
                 <button className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-slate-300 hover:bg-[#2d3039] hover:text-white transition-colors">
                    <Globe size={16} className="text-slate-400" /> 
                    <span>Language</span>
                 </button>
                 
                 <div className="h-px bg-[#2d3039] my-1 mx-2"></div>
                 
                 <button 
                   onClick={() => {
                     setIsDropdownOpen(false);
                     onLogout();
                   }}
                   className="w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm font-bold text-red-500 hover:bg-[#2d3039]/50 hover:text-red-400 transition-colors"
                 >
                    <LogOut size={16} /> 
                    <span>Log Out</span>
                 </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};