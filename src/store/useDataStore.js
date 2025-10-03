// Cole este código final e aprimorado em useDataStore.js
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// --- Chaves do Local Storage ---
const PROJECTS_STORAGE_KEY = 'syncup_projects';
const TEAM_STORAGE_KEY = 'syncup_team';

// --- Funções Genéricas de Carregamento ---
const loadFromStorage = (key) => {
  try {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    }
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error(`Failed to load ${key} from local storage`, error);
    return [];
  }
};

// --- Função Auxiliar para Determinar o Status ---
const getStatusByProgress = (progress) => {
  if (progress <= 0) {
    return 'A fazer';
  }
  if (progress >= 100) {
    return 'Concluído';
  }
  return 'Em Andamento';
};

// --- Nossa Store Completa ---
const useDataStore = create(immer((set) => ({
  projects: loadFromStorage(PROJECTS_STORAGE_KEY),
  team: loadFromStorage(TEAM_STORAGE_KEY),

  // --- AÇÕES CRUD PARA PROJETOS ---
  addProject: (newProjectData) =>
    set((state) => {
      const newProject = { 
        ...newProjectData, 
        id: Date.now(), 
        status: getStatusByProgress(newProjectData.progress) // Usando a nova função
      };
      state.projects.push(newProject);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(state.projects));
    }),
    
  updateProject: (projectId, updatedData) =>
    set((state) => {
      const projectIndex = state.projects.findIndex((p) => p.id === projectId);
      if (projectIndex !== -1) {
        const currentProject = state.projects[projectIndex];
        const newProgress = updatedData.progress !== undefined ? updatedData.progress : currentProject.progress;
        
        const newStatus = getStatusByProgress(newProgress); // Usando a nova função

        state.projects[projectIndex] = {
          ...currentProject,
          ...updatedData,
          status: newStatus,
        };
        
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(state.projects));
      }
    }),

  deleteProject: (projectId) =>
    set((state) => {
      state.projects = state.projects.filter((p) => p.id !== projectId);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(state.projects));
    }),

  // --- AÇÕES CRUD PARA EQUIPE ---
  addTeamMember: (newMemberData) =>
    set((state) => {
      const newMember = { ...newMemberData, id: Date.now(), status: 'Online' };
      state.team.push(newMember);
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(state.team));
    }),
  updateTeamMember: (memberId, updatedData) =>
    set((state) => {
      const memberIndex = state.team.findIndex((m) => m.id === memberId);
      if (memberIndex !== -1) {
        state.team[memberIndex] = { ...state.team[memberIndex], ...updatedData };
        localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(state.team));
      }
    }),
  deleteTeamMember: (memberId) =>
    set((state) => {
      state.team = state.team.filter((m) => m.id !== memberId);
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(state.team));
    }),
})));

export default useDataStore;