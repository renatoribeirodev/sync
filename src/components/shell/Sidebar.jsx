
// Cole este código completo e corrigido em Sidebar.jsx
import React from 'react';
// AQUI ESTÁ A LINHA CORRIGIDA: Todos os ícones em uma única importação, sem repetição.
import { LayoutDashboard, FolderKanban, Users, BarChart2 } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';
import './Sidebar.css';

const Sidebar = () => {
  const activePage = useAuthStore((state) => state.activePage);
  const setActivePage = useAuthStore((state) => state.setActivePage);

  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
    { id: 'projects', icon: <FolderKanban size={22} />, label: 'Projetos' },
    { id: 'team', icon: <Users size={22} />, label: 'Equipe' },
    { id: 'analytics', icon: <BarChart2 size={22} />, label: 'Análise' }, // Nossa nova página POC
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-logo">SU</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-button ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;