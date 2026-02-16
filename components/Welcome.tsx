import React from 'react';
import { User } from '../types';

interface WelcomeProps {
  user: User;
  onLogout: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ user, onLogout }) => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-4">¡Bienvenido, {user.email}!</h2>
      <p className="text-zinc-400 mb-8">Has iniciado sesión correctamente.</p>
      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Welcome;
