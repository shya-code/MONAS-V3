import React, { useState } from 'react';
import { Camera, Save, X, User, AtSign, FileText, Globe, Twitter, Github, Upload, Trash2, RefreshCw, CheckCircle2 } from 'lucide-react';

interface EditProfileProps {
  username: string;
  onSave: (newUsername: string) => void;
  onCancel: () => void;
}

export const EditProfile: React.FC<EditProfileProps> = ({ username, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    username: username,
    nickname: 'Monad_Maxi',
    about: 'Just a passionate streamer on the Monad network. Building, shipping, and gaming.',
    website: 'https://monad.xyz',
    twitter: '@monad_xyz',
    github: 'monad-dev',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setDirty(true);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      onSave(formData.username);
    }, 1200);
  };

  const regenerateAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setFormData({...formData, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`});
    setDirty(true);
  };

  return (
    <div className="h-full w-full p-6 md:p-10 overflow-y-auto no-scrollbar bg-[#0f1117] flex justify-center">
       <div className="w-full max-w-4xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#2d3039] pb-6">
             <div>
                <h1 className="text-3xl font-[900] text-white tracking-tighter uppercase mb-2">Edit Profile</h1>
                <p className="text-slate-400 text-sm font-medium">Manage your identity and public profile appearance.</p>
             </div>
             <div className="flex items-center gap-3">
                <button 
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-[#2d3039] transition-all"
                >
                   Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={!dirty || isSaving}
                  className={`px-6 py-2 rounded-lg text-xs font-[900] text-white uppercase tracking-widest transition-all flex items-center gap-2 ${
                    dirty && !isSaving ? 'bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-900/20' : 'bg-[#2d3039] text-slate-500 cursor-not-allowed'
                  }`}
                >
                   {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                   Save Changes
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* LEFT COLUMN: Avatar & Quick Stats */}
             <div className="lg:col-span-1 space-y-6">
                {/* Avatar Card */}
                <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6 flex flex-col items-center text-center">
                   <div className="relative group mb-6">
                      <div className="w-40 h-40 rounded-full border-4 border-[#2d3039] overflow-hidden bg-[#0f1117] relative">
                         <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                         {/* Overlay on Hover */}
                         <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={regenerateAvatar}>
                            <RefreshCw size={24} className="text-white mb-2" />
                            <span className="text-[10px] font-bold text-white uppercase">Regenerate</span>
                         </div>
                      </div>
                      <button 
                        onClick={regenerateAvatar}
                        className="absolute bottom-1 right-1 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 shadow-lg transition-transform hover:scale-110"
                        title="Randomize Avatar"
                      >
                         <RefreshCw size={16} />
                      </button>
                   </div>
                   
                   <h3 className="text-white font-bold text-lg mb-1">{formData.nickname}</h3>
                   <span className="text-slate-500 text-xs font-mono">@{formData.username}</span>

                   <div className="flex gap-2 mt-6 w-full">
                      <button className="flex-1 py-2 bg-[#2d3039] hover:bg-[#3d404d] text-slate-300 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                         <Upload size={14} /> Upload
                      </button>
                      <button className="flex-1 py-2 bg-[#2d3039] hover:bg-red-900/30 hover:text-red-500 text-slate-300 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                         <Trash2 size={14} /> Remove
                      </button>
                   </div>
                </div>

                {/* Status Card */}
                <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                   <h4 className="text-[10px] font-[900] text-slate-500 uppercase tracking-widest mb-4">Account Status</h4>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-300">Email Verified</span>
                         <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-300">2FA Enabled</span>
                         <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-300">Streamer Tier</span>
                         <span className="text-xs font-[900] text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">PRO</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* RIGHT COLUMN: Form Fields */}
             <div className="lg:col-span-2 space-y-6">
                
                {/* Identity Section */}
                <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                   <div className="flex items-center gap-3 mb-6 border-b border-[#2d3039] pb-4">
                      <User size={20} className="text-orange-500" />
                      <h3 className="text-sm font-[900] text-white uppercase tracking-widest">Public Identity</h3>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400">Username</label>
                         <div className="relative group">
                            <input 
                              type="text" 
                              value={formData.username}
                              onChange={(e) => handleChange('username', e.target.value)}
                              className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2.5 pl-10 pr-4 text-sm font-bold text-white focus:border-orange-500 outline-none transition-all"
                            />
                            <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                         </div>
                         <p className="text-[10px] text-slate-500">This is your unique URL identifier.</p>
                      </div>

                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-400">Display Name</label>
                         <div className="relative group">
                            <input 
                              type="text" 
                              value={formData.nickname}
                              onChange={(e) => handleChange('nickname', e.target.value)}
                              className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2.5 pl-4 pr-4 text-sm font-bold text-white focus:border-orange-500 outline-none transition-all"
                            />
                         </div>
                         <p className="text-[10px] text-slate-500">How your name appears in chat.</p>
                      </div>
                   </div>

                   <div className="space-y-2 mt-6">
                      <label className="text-xs font-bold text-slate-400">About Me / Bio</label>
                      <div className="relative group">
                         <textarea 
                           value={formData.about}
                           onChange={(e) => handleChange('about', e.target.value)}
                           rows={4}
                           className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-3 pl-10 pr-4 text-sm font-medium text-slate-300 focus:border-orange-500 outline-none transition-all resize-none"
                         />
                         <FileText size={16} className="absolute left-3 top-4 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                      </div>
                   </div>
                </div>

                {/* Social Links Section */}
                <div className="bg-[#181a21] border border-[#2d3039] rounded-xl p-6">
                   <div className="flex items-center gap-3 mb-6 border-b border-[#2d3039] pb-4">
                      <Globe size={20} className="text-blue-500" />
                      <h3 className="text-sm font-[900] text-white uppercase tracking-widest">Social Connections</h3>
                   </div>

                   <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Website</label>
                            <div className="relative group">
                               <input 
                                 type="text" 
                                 value={formData.website}
                                 onChange={(e) => handleChange('website', e.target.value)}
                                 className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2 pl-10 pr-4 text-xs font-bold text-white focus:border-blue-500 outline-none transition-all"
                               />
                               <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500" />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Twitter</label>
                            <div className="relative group">
                               <input 
                                 type="text" 
                                 value={formData.twitter}
                                 onChange={(e) => handleChange('twitter', e.target.value)}
                                 className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2 pl-10 pr-4 text-xs font-bold text-white focus:border-blue-400 outline-none transition-all"
                               />
                               <Twitter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400" />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">GitHub</label>
                            <div className="relative group">
                               <input 
                                 type="text" 
                                 value={formData.github}
                                 onChange={(e) => handleChange('github', e.target.value)}
                                 className="w-full bg-[#0f1117] border border-[#2d3039] rounded-lg py-2 pl-10 pr-4 text-xs font-bold text-white focus:border-white outline-none transition-all"
                               />
                               <Github size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

             </div>
          </div>
       </div>
    </div>
  );
};