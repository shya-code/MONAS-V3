import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, Warehouse, Apple } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (username: string) => void;
}

export const SignUpModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'signup',
  onAuthSuccess 
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const isSignup = mode === 'signup';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    onAuthSuccess(username || email.split('@')[0] || 'monad_user');
    onClose();
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social auth success
    const mockUsername = `${provider}_User_${Math.floor(Math.random() * 1000)}`;
    onAuthSuccess(mockUsername);
    // onClose is handled by parent component via onAuthSuccess usually, 
    // but ensures immediate feedback if logic differs.
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-[420px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 p-8">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8 mt-2">
          <div className="w-8 h-8 bg-slate-950 flex items-center justify-center rounded-lg shadow-lg">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isSignup ? 'Join Monas today' : 'Log in to Monas'}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup ? (
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 bg-white border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-900"
                placeholder=""
                required
              />
              <button type="button" className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
                Use phone number instead
              </button>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-11 px-4 bg-white border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-900"
                  placeholder=""
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-4 bg-white border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-900 pr-10"
                    placeholder=""
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button type="button" className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all">
                  Trouble logging in?
                </button>
              </div>
            </>
          )}

          <button 
            type="submit"
            className="w-full h-11 rounded-lg font-bold text-sm tracking-wide bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-all disabled:cursor-not-allowed"
            disabled={isSignup ? !email : (!username || !password)}
          >
            {isSignup ? 'Continue' : 'Log In'}
          </button>

          {/* Divider */}
          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <button 
              type="button" 
              onClick={() => handleSocialLogin('Google')}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isSignup ? 'Sign up' : 'Continue'} with Google
            </button>
            <button 
              type="button" 
              onClick={() => handleSocialLogin('Amazon')}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-slate-700 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all group"
            >
              <Warehouse className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
              {isSignup ? 'Sign up' : 'Continue'} with Amazon
            </button>
            <button 
              type="button" 
              onClick={() => handleSocialLogin('Apple')}
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-slate-900 flex items-center justify-center gap-3 hover:bg-slate-100 transition-all group"
            >
              <Apple className="w-5 h-5 text-slate-900 fill-current group-hover:scale-110 transition-transform" />
              {isSignup ? 'Sign up' : 'Continue'} with Apple
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button 
            type="button"
            onClick={() => setMode(isSignup ? 'login' : 'signup')}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-all"
          >
            {isSignup ? 'Have an account? Log in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};