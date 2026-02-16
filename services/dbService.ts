
import { User } from '../types';

const USERS_KEY = 'auth_app_users';
const CURRENT_USER_KEY = 'auth_app_session';

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
