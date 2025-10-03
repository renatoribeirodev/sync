// Cole este código final e completo em Projects.jsx
import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import useDataStore from '../../store/useDataStore';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import ProjectForm from '../forms/ProjectForm';
import './MicroApp.css';

const Projects = () => {
  // Buscando os dados e TODAS as ações que vamos usar
const projects = useDataStore((state) => state.projects);
const deleteProject = useDataStore((state) => state.deleteProject);

  // Estados para controlar o modal e qual projeto está em edição
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const getStatusClass = (status) => {
    switch (status) {
      case 'A fazer': return 'status-todo'; // ADICIONE ESTA LINHA
      case 'Em Andamento': return 'status-inprogress';
      case 'Concluído': return 'status-completed';
      case 'Pausado': return 'status-paused'; // Mantemos o status pausado para o futuro
      default: return '';
    }
  };

  // --- Nossas novas funções de controle ---

  const handleOpenModalForCreate = () => {
    setProjectToEdit(null); // Limpa o estado de edição
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (project) => {
    setProjectToEdit(project); // Define qual projeto será editado
    setIsModalOpen(true);
  };

  const handleDelete = (projectId) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      deleteProject(projectId);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProjectToEdit(null);
  }

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Visualização de Projetos</h2>
          <button className="add-project-btn" onClick={handleOpenModalForCreate}>
            <PlusCircle size={20} />
            <span>Adicionar Projeto</span>
          </button>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <Card key={project.id}>
              {/* --- Conteúdo do Card (com botões de ação) --- */}
              <div className="project-card-content">
                <div className="project-card-header">
                  <h3 className="project-title">{project.name}</h3>
                  <span className={`project-status ${getStatusClass(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-progress">
                  <span className="progress-label">Progresso: {project.progress}%</span>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              {/* --- Botões de Ação no Rodapé do Card --- */}
              <div className="card-actions-footer">
                <button className="icon-action-btn" onClick={() => handleOpenModalForEdit(project)} title="Editar">
                  <Edit size={18} />
                </button>
                <button className="icon-action-btn danger" onClick={() => handleDelete(project.id)} title="Excluir">
                  <Trash2 size={18} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={projectToEdit ? 'Editar Projeto' : 'Criar Novo Projeto'}
      >
        <ProjectForm 
          onClose={handleCloseModal}
          projectToEdit={projectToEdit}
        />
      </Modal>
    </>
  );
};

export default Projects;