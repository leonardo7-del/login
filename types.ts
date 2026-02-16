
export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  createdAt: string;
  avatarUrl?: string;
}

export type AuthView = 'login' | 'register' | 'forgot-password';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
