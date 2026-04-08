import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'principal' | 'operativo' | 'auditor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const MOCK_USERS: Record<string, User & { password: string }> = {
  'admin@marko.com': {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'admin@marko.com',
    role: 'principal',
    password: 'admin123',
  },
  'operador@marko.com': {
    id: '2',
    name: 'Ana García',
    email: 'operador@marko.com',
    role: 'operativo',
    password: 'oper123',
  },
  'auditor@marko.com': {
    id: '3',
    name: 'Luis Torres',
    email: 'auditor@marko.com',
    role: 'auditor',
    password: 'audit123',
  },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        await new Promise((r) => setTimeout(r, 800));
        const mockUser = MOCK_USERS[email];
        if (mockUser && mockUser.password === password) {
          const { password: _, ...user } = mockUser;
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'marko-auth' }
  )
);
