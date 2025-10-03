// Cole este código em App.jsx
import React from 'react';
import useAuthStore from './store/useAuthStore';
import Login from './pages/Login';
import AppShell from './components/shell/AppShell';
import './components/ui/GlobalStyles.css'; // Importa os estilos globais

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Renderização condicional: se estiver autenticado, mostra o AppShell, senão, a página de Login.
  return (
    <>
      {isAuthenticated ? <AppShell /> : <Login />}
    </>
  );
}

export default App;