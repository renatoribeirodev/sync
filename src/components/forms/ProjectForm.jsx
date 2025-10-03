// Cole este código atualizado em ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import useDataStore from '../../store/useDataStore';
import './ProjectForm.css';

const ProjectForm = ({ projectToEdit, onClose }) => {
  // Buscando as ações da store
const addProject = useDataStore((state) => state.addProject);
const updateProject = useDataStore((state) => state.updateProject);

  // Estado local do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);

  // Este 'useEffect' preenche o formulário se estivermos editando um projeto
  useEffect(() => {
    if (projectToEdit) {
      setName(projectToEdit.name);
      setDescription(projectToEdit.description);
      setProgress(projectToEdit.progress);
    }
  }, [projectToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('O nome do projeto é obrigatório.');
      return;
    }
    
    const projectData = { name, description, progress: Number(progress) };

    if (projectToEdit) {
      // Se projectToEdit existe, estamos no modo de EDIÇÃO
      updateProject(projectToEdit.id, projectData);
    } else {
      // Senão, estamos no modo de CRIAÇÃO
      addProject(projectData);
    }
    
    onClose(); // Fecha o modal após o envio
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="form-group">
        <label htmlFor="name">Nome do Projeto</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Lançamento do App Mobile"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o objetivo do projeto"
          rows="4"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="progress">Progresso (%)</label>
        <input
          id="progress"
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          min="0"
          max="100"
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {projectToEdit ? 'Salvar Alterações' : 'Adicionar Projeto'}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;