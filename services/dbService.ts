
import { User } from '../types';

const USERS_KEY = 'auth_app_users';
const CURRENT_USER_KEY = 'auth_app_session';
const DEV_BASE = '/api';
const DIRECT_BASE = (import.meta as any).env?.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api';
const API_BASE = (typeof window !== 'undefined' && window.location.port === '3000') ? DEV_BASE : DIRECT_BASE;

export const dbService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User): void => {
    const users = dbService.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  findUserByEmail: (email: string): User | undefined => {
    const users = dbService.getUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  registerUserRemote: async (email: string, password: string): Promise<{ id: number; email: string }> => {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      let message = 'Error en el registro';
      try {
        const data = await res.json();
        if (data?.errors && typeof data.errors === 'object') {
          const firstKey = Object.keys(data.errors)[0];
          const firstMsg = firstKey ? (data.errors[firstKey]?.[0] ?? null) : null;
          message = firstMsg || data.message || message;
        } else {
          message = data?.message || message;
        }
      } catch {
        message = `HTTP ${res.status} ${res.statusText}`.trim();
      }
      throw new Error(message);
    }
    return res.json();
  },

  setSession: (user: User): void => {
    // We omit password for security in session storage
    const { password, ...safeUser } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));
  },

  getSession: (): User | null => {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  clearSession: (): void => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
