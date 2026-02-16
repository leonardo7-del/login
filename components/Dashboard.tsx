
import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Sidebar/Nav */}
      <nav className="border-b border-zinc-900 bg-zinc-950 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center font-bold text-zinc-950">
                S
              </div>
              <span className="text-xl font-bold tracking-tight">SecureVault</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-sm font-medium">{user.fullName}</span>
                <span className="text-xs text-zinc-500">{user.email}</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold mb-4 text-zinc-100">¡Bienvenido de nuevo, {user.fullName.split(' ')[0]}!</h1>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Has iniciado sesión exitosamente en tu panel de control. Aquí puedes gestionar tu perfil, ver tus actividades recientes y configurar la seguridad de tu cuenta.
            </p>
            <div className="flex gap-4">
              <button className="bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-2.5 rounded-xl font-medium transition-colors">
                Ver Perfil
              </button>
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors border border-zinc-700">
                Ajustes
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-xl">
            <div className="w-16 h-16 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Cuenta Protegida</h3>
            <p className="text-sm text-zinc-500">Tu cuenta está cifrada y segura en nuestra base de datos indexada local.</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-zinc-100">Actividad Reciente</h2>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
             <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
               <div className="w-10 h-10 bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center border border-zinc-700">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                 </svg>
               </div>
               <div>
                 <p className="font-medium">Inicio de sesión exitoso</p>
                 <p className="text-xs text-zinc-500">Hoy a las {new Date().toLocaleTimeString()}</p>
               </div>
             </div>
             <div className="p-6 border-b border-zinc-800 flex items-center gap-4">
               <div className="w-10 h-10 bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center border border-zinc-700">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                 </svg>
               </div>
               <div>
                 <p className="font-medium">Registro de cuenta completado</p>
                 <p className="text-xs text-zinc-500">Fecha de creación: {new Date(user.createdAt).toLocaleDateString()}</p>
               </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
