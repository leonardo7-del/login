
import React, { useState } from 'react';
import { User } from '../types';
import { dbService } from '../services/dbService';
import Input from './Input';

interface LoginProps {
  onSuccess: (user: User) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API latency
    setTimeout(() => {
      const user = dbService.findUserByEmail(email);

      if (!user) {
        setError('No se encontró ninguna cuenta con este correo.');
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        setError('Contraseña incorrecta. Por favor intente de nuevo.');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onSuccess(user);
    }, 1000);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-1">Bienvenido</h3>
        <p className="text-sm text-slate-400">Ingresa tus credenciales para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Input
          label="Correo electrónico"
          type="email"
          placeholder="nombre@ejemplo.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          }
        />

        <div className="space-y-1">
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
          />
          <div className="flex justify-end">
            <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl 
            transition-all duration-200 transform active:scale-[0.98]
            flex items-center justify-center gap-2
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verificando...</span>
            </>
          ) : (
            'Iniciar Sesión'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-800 text-center">
        <p className="text-sm text-slate-400">
          ¿No tienes una cuenta?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
