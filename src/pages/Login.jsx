// Cole este código em Login.jsx
import React from 'react';
import { LogIn } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import './Login.css'; // Vamos criar este arquivo de estilo a seguir

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const handleLogin = () => {
    // Aqui acontece a "mágica": chamamos a ação que simula
    // o retorno de sucesso do fluxo OAuth 2.0.
    login();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">SyncUp</h1>
        <p className="login-subtitle">Project Manager</p>
        <button className="login-button" onClick={handleLogin}>
          <LogIn size={20} />
          <span>Entrar com Conta Corporativa</span>
        </button>
      </div>
    </div>
  );
};

export default Login;