import create from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  gameState: any;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateGameState: (gameState: any) => Promise<void>;
}

const API_URL = 'http://api.folioar.com/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
      throw error;
    }
  },

  register: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isLoading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Registration failed', isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  updateGameState: async (gameState) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/user/game-state`,
        { gameState },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      set(state => ({
        user: { ...state.user!, gameState: response.data.gameState }
      }));
    } catch (error: any) {
      console.error('Failed to update game state:', error);
      throw error;
    }
  }
}));