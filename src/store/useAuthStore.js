// Cole este código em useAuthStore.js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { mockUser } from '../utils/mock';

const useAuthStore = create(
  immer((set) => ({
    isAuthenticated: false,
    user: null,
    activePage: 'dashboard', // Página inicial após login

    // Simulação do retorno do OAuth 2.0
    login: () =>
      set((state) => {
        state.isAuthenticated = true;
        state.user = mockUser;
      }),

    logout: () =>
      set((state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.activePage = 'dashboard'; // Reseta para a página inicial ao sair
      }),

    setActivePage: (page) =>
      set((state) => {
        state.activePage = page;
      }),
  }))
);

export default useAuthStore;