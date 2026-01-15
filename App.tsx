import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { ViewerRoom } from './pages/ViewerRoom';
import { StreamerDashboard } from './pages/StreamerDashboard';
import { BrowseChannels } from './pages/BrowseChannels';
import { Following } from './pages/Following';
import { EditProfile } from './pages/EditProfile';
import { CreatorStudio } from './pages/CreatorStudio';
import { Achievements } from './pages/Achievements';
import { SignUpModal } from './components/SignUpModal';
import { LoadingScreen } from './components/LoadingScreen';
import { UserRole, Channel } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<UserRole>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [username, setUsername] = useState<string>('monad_user_88');
  const [pendingRole, setPendingRole] = useState<UserRole>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'following' | 'edit-profile' | 'creator-studio' | 'achievements'>('browse');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const handleAuthSuccess = (newUsername: string) => {
    setIsLoggedIn(true);
    setUsername(newUsername);
    setIsAuthModalOpen(false);

    // If user was trying to access a specific role (e.g. Go Live), handle it now
    if (pendingRole === 'streamer') {
      // For UX smoothness, we assume the user wants to connect wallet if they are going live
      // In a real app, this might be a separate signature step, but here we auto-connect
      if (!walletConnected) {
         setWalletConnected(true);
      }
      setRole('streamer');
      setPendingRole(null);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setWalletConnected(false);
    setViewMode('browse');
  };

  const handleReset = () => {
    setRole(null);
    setSelectedChannel(null);
    setViewMode('browse');
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
    if (selectedRole === 'streamer') {
      // 1. Check Login
      if (!isLoggedIn) {
        setPendingRole('streamer');
        openAuth('login');
        return;
      }
      
      // 2. Check Wallet (if already logged in)
      if (!walletConnected) {
        // Simple confirm for the prototype
        const confirmConnect = window.confirm("Connect Monad Wallet to access Streamer Dashboard?");
        if (confirmConnect) {
          setWalletConnected(true);
          setRole('streamer');
        }
        return;
      }
    } else if (selectedRole === 'viewer') {
      // Reset view mode when explicitly selecting viewer
      if (viewMode === 'edit-profile' || viewMode === 'creator-studio' || viewMode === 'achievements') {
        setViewMode('browse');
      }
    }
    
    setRole(selectedRole);
  };

  const handleHeaderNavigate = (mode: 'browse' | 'following' | 'edit-profile' | 'creator-studio' | 'achievements') => {
    // Switch to viewer role if not already or if in streamer mode (unless just changing views)
    // Exception: creator-studio and achievements should probably technically be a 'streamer' or 'user' feature but visible to anyone logged in for this prototype
    if (role !== 'viewer' && mode !== 'creator-studio' && mode !== 'achievements') {
        setRole('viewer');
    }
    setSelectedChannel(null);
    setViewMode(mode);
  };

  const renderContent = () => {
    if (!role) return <Home onSelectRole={handleRoleSelect} />;
    
    // Check global view modes that override everything else
    if (viewMode === 'creator-studio') {
       return <CreatorStudio walletConnected={walletConnected} username={username} />;
    }

    if (viewMode === 'achievements') {
       return <Achievements username={username} />;
    }

    if (role === 'viewer') {
      if (viewMode === 'edit-profile') {
        return (
          <EditProfile 
            username={username}
            onSave={(newUsername) => {
              setUsername(newUsername);
              setViewMode('browse');
            }}
            onCancel={() => setViewMode('browse')}
          />
        );
      }

      if (selectedChannel) {
        return (
          <ViewerRoom 
            walletConnected={walletConnected} 
            username={username} 
            channel={selectedChannel}
            onBack={() => setSelectedChannel(null)}
          />
        );
      }
      
      // Render view based on viewMode
      if (viewMode === 'following') {
        return <Following onSelectChannel={setSelectedChannel} />;
      }
      
      return <BrowseChannels onSelectChannel={setSelectedChannel} />;
    }
    
    if (role === 'streamer') {
      // If the streamer is live, they see the StreamerDashboard
      // If they want to see "Creator Studio" or "Achievements", we handled that above with the global check
      return <StreamerDashboard walletConnected={walletConnected} username={username} />;
    }
    
    return <Home onSelectRole={handleRoleSelect} />;
  };

  if (isLoading) {
    return <LoadingScreen onFinished={() => setIsLoading(false)} />;
  }

  return (
    <div className="h-screen flex flex-col bg-[#0f1117] text-slate-200">
      
      <Header 
        walletConnected={walletConnected} 
        onConnect={() => setWalletConnected(!walletConnected)}
        isLoggedIn={isLoggedIn}
        onLogin={() => openAuth('login')}
        onSignUp={() => openAuth('signup')}
        onLogout={handleLogout}
        username={isLoggedIn ? username : 'Guest'}
        onReset={handleReset}
        activeView={role === 'viewer' && !selectedChannel ? viewMode : undefined}
        onNavigate={handleHeaderNavigate}
      />

      {/* Main Layout Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Persistent Sidebar for Viewer Mode or Default, hide in Studio/EditProfile/Achievements to allow full width */}
        {(role === 'viewer' || !role) && viewMode !== 'creator-studio' && viewMode !== 'edit-profile' && viewMode !== 'achievements' && (
          <Sidebar onSelectChannel={(c) => {
            setRole('viewer');
            setSelectedChannel(c);
          }} />
        )}

        <main className="flex-1 relative overflow-hidden bg-[#0f1117]">
           {renderContent()}
        </main>
      </div>
      
      <SignUpModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialMode={authModalMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default App;