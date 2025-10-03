// Cole este código em TeamForm.jsx
import React, { useState, useEffect } from 'react';
import useDataStore from '../../store/useDataStore';
import './TeamForm.css'; // Usaremos um estilo similar ao do ProjectForm

const TeamForm = ({ memberToEdit, onClose }) => {
  // Ações da nossa store
const addTeamMember = useDataStore((state) => state.addTeamMember);
const updateTeamMember = useDataStore((state) => state.updateTeamMember);

  // Estado local do formulário
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  // Efeito para preencher o formulário se estivermos editando
  useEffect(() => {
    if (memberToEdit) {
      setName(memberToEdit.name);
      setRole(memberToEdit.role);
      setEmail(memberToEdit.email);
      setAvatar(memberToEdit.avatar);
    }
  }, [memberToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !email.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const memberData = { name, role, email, avatar: avatar || `https://i.pravatar.cc/150?u=${email}` };

    if (memberToEdit) {
      // Modo Edição
      updateTeamMember(memberToEdit.id, memberData);
    } else {
      // Modo Criação
      addTeamMember(memberData);
    }
    
    onClose(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit} className="team-form">
      <div className="form-group">
        <label htmlFor="name">Nome Completo</label>
        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="role">Cargo</label>
        <input id="role" type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="avatar">URL do Avatar (Opcional)</label>
        <input id="avatar" type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Deixe em branco para um avatar aleatório"/>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button type="submit" className="btn btn-primary">
          {memberToEdit ? 'Salvar Alterações' : 'Adicionar Membro'}
        </button>
      </div>
    </form>
  );
};

export default TeamForm;