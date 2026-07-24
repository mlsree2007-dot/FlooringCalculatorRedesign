import type { Project, MultiRoomProject } from './types';

const PROJECTS_KEY = 'flooring_projects';
const HISTORY_KEY = 'flooring_history';

export const storage = {
  // Projects
  saveProject: (project: Project): void => {
    const projects = storage.getProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);
    
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  getProjects: (): Project[] => {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  },

  deleteProject: (id: string): void => {
    const projects = storage.getProjects().filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },

  // History
  addToHistory: (project: Project): void => {
    const history = storage.getHistory();
    history.unshift(project);
    
    // Keep only last 50 items
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
  },

  getHistory: (): Project[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  clearHistory: (): void => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  },

  // Multi-room projects
  saveMultiRoomProject: (project: MultiRoomProject): void => {
    const projects = storage.getMultiRoomProjects();
    const existingIndex = projects.findIndex(p => p.id === project.id);
    
    if (existingIndex >= 0) {
      projects[existingIndex] = project;
    } else {
      projects.push(project);
    }
    
    localStorage.setItem('flooring_multiroom_projects', JSON.stringify(projects));
  },

  getMultiRoomProjects: (): MultiRoomProject[] => {
    const data = localStorage.getItem('flooring_multiroom_projects');
    return data ? JSON.parse(data) : [];
  },

  deleteMultiRoomProject: (id: string): void => {
    const projects = storage.getMultiRoomProjects().filter(p => p.id !== id);
    localStorage.setItem('flooring_multiroom_projects', JSON.stringify(projects));
  },
};
