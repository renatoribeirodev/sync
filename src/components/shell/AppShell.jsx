import React, { Suspense } from 'react'; // Importe Suspense
import Header from './Header';
import Sidebar from './Sidebar';
import useAuthStore from '../../store/useAuthStore';
import './AppShell.css';

// Importações estáticas para os componentes locais
import Dashboard from '../micro-apps/Dashboard';
import Projects from '../micro-apps/Projects';
import Team from '../micro-apps/Team';

// IMPORTAÇÃO DINÂMICA DO NOSSO MICRO-FRONTEND "REAL"
const AnalyticsPage = React.lazy(() => import('analytics_app/AnalyticsPage'));

const AppShell = () => {
  const activePage = useAuthStore((state) => state.activePage);

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'projects':
        return <Projects />;
      case 'team':
        return <Team />;
      case 'analytics': // Novo caso para a página remota
        return <AnalyticsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="page-content">
          {/* Suspense é necessário para aguardar o carregamento do componente remoto */}
          <Suspense fallback={<div>Carregando micro-frontend...</div>}>
            {renderActivePage()}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AppShell;