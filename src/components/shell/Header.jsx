// Cole este código em Header.jsx
import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import { Bell, LogOut } from 'lucide-react';
import './Header.css'; // Estilos a seguir

const Header = () => {
const user = useAuthStore((state) => state.user);
const logout = useAuthStore((state) => state.logout);

  if (!user) return null; // Garante que o header não renderize sem usuário

  return (
    <header className="app-header">
      <div className="header-title">
        {/* Este título pode ser dinâmico no futuro */}
      </div>
      <div className="user-profile">
        <button className="icon-button">
            <Bell size={20} />
        </button>
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-role">{user.role}</span>
        </div>
        <button className="icon-button logout-button" onClick={logout} title="Sair">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;