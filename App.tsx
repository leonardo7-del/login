
import React, { useState, useEffect, useCallback } from 'react';
import { User, AuthView } from './types';
import { dbService } from './services/dbService';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<AuthView>('login');
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Initialize session
  useEffect(() => {
    const session = dbService.getSession();
    if (session) {
      setUser(session);
    }
    // Simulate initial loading for polished feel
    setTimeout(() => {
      setIsAppLoading(false);
    }, 800);
  }, []);

  const handleLoginSuccess = useCallback((loggedInUser: User) => {
    dbService.setSession(loggedInUser);
    setUser(loggedInUser);
  }, []);

  const handleLogout = useCallback(() => {
    dbService.clearSession();
    setUser(null);
    setView('login');
  }, []);

  if (isAppLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium">Iniciando SecureVault...</p>
      </div>
    );
  }

  // If user is logged in, show dashboard
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // Auth Layout wrapper for Login/Register
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Background blobs removed for a clean, non-blurred look */}
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-500/10 mb-4 transition-transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">SecureVault</h2>
          <p className="text-slate-400 mt-2">Sistema de autenticación indexado</p>
        </div>

        {/* Form container changed to solid bg-slate-900, removed backdrop-blur and transparency */}
        <div className="bg-slate-900 border border-slate-800 shadow-2xl rounded-3xl overflow-hidden">
          {view === 'login' ? (
            <Login 
              onSuccess={handleLoginSuccess} 
              onSwitchToRegister={() => setView('register')} 
            />
          ) : (
            <Register 
              onSuccess={() => {
                setView('login');
              }} 
              onSwitchToLogin={() => setView('login')} 
            />
          )}
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} SecureVault. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default App;
