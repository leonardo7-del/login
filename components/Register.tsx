
import React, { useState } from 'react';
import { dbService } from '../services/dbService';
import Input from './Input';

interface RegisterProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validations
    if (!email || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      const existingUser = dbService.findUserByEmail(email);

      if (existingUser) {
        setError('Este correo electrónico ya está registrado.');
        setIsLoading(false);
        return;
      }

      // Generate a default name from the email (e.g., "user" from "user@example.com")
      const derivedName = email.split('@')[0];

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
        email,
        password,
        createdAt: new Date().toISOString(),
      };

      dbService.saveUser(newUser);
      setIsLoading(false);
      setIsSuccess(true);
      
      // Auto-redirect to login after 1.5 seconds
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="p-12 text-center">
        <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">¡Cuenta creada!</h3>
        <p className="text-slate-400">Registro exitoso. Redirigiendo...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-1">Crea tu cuenta</h3>
        <p className="text-sm text-slate-400">Solo necesitas un correo y contraseña</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl 
            transition-all duration-200 transform mt-4
            flex items-center justify-center gap-2
            ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Registrando...</span>
            </>
          ) : (
            'Registrarse'
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-800 text-center">
        <p className="text-sm text-slate-400">
          ¿Ya tienes una cuenta?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors"
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
