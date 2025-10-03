// Cole este código 100% completo e final em Dashboard.jsx
import React from 'react';
// Importamos o ícone ListTodo para o novo card
import { FolderKanban, Users, CheckCircle, Activity, ListTodo } from 'lucide-react';
import useDataStore from '../../store/useDataStore';
import Card from '../ui/Card';
import './MicroApp.css';

const Dashboard = () => {
  const projects = useDataStore((state) => state.projects);
  const team = useDataStore((state) => state.team);

  // --- LÓGICA DE CÁLCULO FINAL E COMPLETA ---
  const activeProjectsCount = projects.filter(p => p.status !== 'Concluído').length;
  const todoProjectsCount = projects.filter(p => p.status === 'A fazer').length;
  const inProgressProjectsCount = projects.filter(p => p.status === 'Em Andamento').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Concluído').length;


  return (
    <div className="page-container">
      <h2 className="page-title">Dashboard Geral</h2>
      <div className="stats-grid">
        <Card>
          <div className="stat-item">
            <FolderKanban size={32} className="stat-icon purple"/>
            <div className="stat-info">
              <span className="stat-value">{activeProjectsCount}</span>
              <span className="stat-label">Projetos Ativos</span>
            </div>
          </div>
        </Card>
        
        {/* --- NOVO CARD "A FAZER" ADICIONADO AQUI --- */}
        <Card>
          <div className="stat-item">
            <ListTodo size={32} className="stat-icon gray"/>
            <div className="stat-info">
              <span className="stat-value">{todoProjectsCount}</span>
              <span className="stat-label">Projetos a fazer</span>
            </div>
          </div>
        </Card>
        {/* --- FIM DO NOVO CARD --- */}

        <Card>
          <div className="stat-item">
            <Activity size={32} className="stat-icon orange"/>
            <div className="stat-info">
              <span className="stat-value">{inProgressProjectsCount}</span>
              <span className="stat-label">Projetos em Andamento</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="stat-item">
            <CheckCircle size={32} className="stat-icon green"/>
            <div className="stat-info">
              <span className="stat-value">{completedProjectsCount}</span>
              <span className="stat-label">Projetos Concluídos</span>
            </div>
          </div>
        </Card>

        {/* O card de equipe pode ficar por último para agrupar os de projetos */}
        <Card>
          <div className="stat-item">
            <Users size={32} className="stat-icon blue"/>
            <div className="stat-info">
              <span className="stat-value">{team.length}</span>
              <span className="stat-label">Membros na Equipe</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;