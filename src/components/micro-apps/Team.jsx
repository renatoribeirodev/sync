// Cole este código completo e atualizado em Team.jsx
import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import useDataStore from '../../store/useDataStore';
import Modal from '../ui/Modal';
import TeamForm from '../forms/TeamForm';
import './MicroApp.css';

const Team = () => {
  // Buscando os dados e as ações da nossa store
const team = useDataStore((state) => state.team);
const deleteTeamMember = useDataStore((state) => state.deleteTeamMember);

  // Estado para controlar o modal e qual membro está sendo editado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const getStatusIndicatorClass = (status) => {
    return status === 'Online' ? 'status-indicator-online' : 'status-indicator-offline';
  };

  const handleOpenModalForCreate = () => {
    setMemberToEdit(null); // Garante que o formulário estará vazio
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (member) => {
    setMemberToEdit(member); // Passa os dados do membro para o formulário
    setIsModalOpen(true);
  };

  const handleDelete = (memberId) => {
    // Usamos um confirm para uma exclusão segura
    if (window.confirm('Tem certeza que deseja excluir este membro?')) {
      deleteTeamMember(memberId);
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMemberToEdit(null);
  }

  return (
    <>
      <div className="page-container">
        <div className="page-header">
          <h2 className="page-title">Membros da Equipe</h2>
          <button className="add-project-btn" onClick={handleOpenModalForCreate}>
            <PlusCircle size={20} />
            <span>Adicionar Membro</span>
          </button>
        </div>

        <div className="team-table-container">
          <table className="team-table">
            <thead>
              <tr>
                <th>Membro</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Email</th>
                <th className="actions-column">Ações</th> 
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className="member-cell">
                      <img src={member.avatar} alt={member.name} className="member-avatar" />
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td>{member.role}</td>
                  <td>
                    <div className="status-cell">
                      <span className={`status-indicator ${getStatusIndicatorClass(member.status)}`}></span>
                      {member.status}
                    </div>
                  </td>
                  <td>{member.email}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-action-btn" onClick={() => handleOpenModalForEdit(member)} title="Editar">
                        <Edit size={18} />
                      </button>
                      <button className="icon-action-btn danger" onClick={() => handleDelete(member.id)} title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={memberToEdit ? 'Editar Membro da Equipe' : 'Adicionar Novo Membro'}
      >
        <TeamForm 
          onClose={handleCloseModal}
          memberToEdit={memberToEdit}
        />
      </Modal>
    </>
  );
};

export default Team;