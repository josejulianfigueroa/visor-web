import { User } from '@/interfaces/user-client.interface';
import { create } from 'zustand';
import { persist } from "zustand/middleware";


export type AuthStatus = 'authenticated' | 'unauthenticated' | 'checking';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string, idClient: string, expoPushToken: string) => Promise<boolean>;
  logout: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
    persist(
  (set, get) => ({
    
  // Properties
  status: 'checking',
  token: undefined,
  user: undefined,

  // Actions
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }

    set({
      status: 'authenticated',
      token: token,
      user: user,
    });

    return true;
  },

  login: async (email: string, password: string, idClient: string, expoPushToken: string) => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, idClient, expoPushToken }),
  });

   if (!res.ok) {
     return get().changeStatus(undefined, undefined);
  } else {

  const data = await res.json();
return get().changeStatus(data.token, data.user);
  }
  },

  logout: async () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  },
}),
    {
      name: "auth-storage",
    })
    );

