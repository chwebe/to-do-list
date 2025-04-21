// ProjectList Class - Manages a collection of projects

import Project from './Project';

class ProjectList {
  #projects;

  constructor() {
    this.#projects = new Map(); // Using Map for O(1) access by ID
  }

  addProject(project) {
    // Validate that the argument is a Project instance
    if (!(project instanceof Project)) {
      throw new Error('Only Project objects can be added to ProjectList');
    }

    // Check if project with same ID already exists
    if (this.#projects.has(project.id)) {
      throw new Error('Project with this ID already exists');
    }

    this.#projects.set(project.id, project);
  }

  removeProject(projectId) {
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    return this.#projects.delete(projectId);
  }

  getProjectById(projectId) {
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    return this.#projects.get(projectId) || null;
  }

  getAllProjects() {
    return Array.from(this.#projects.values());
  }

  getActiveProjects() {
    return this.getAllProjects().filter((project) => project.isActive);
  }

  getCompletedProjects() {
    return this.getAllProjects().filter((project) => project.isCompleted);
  }

  getArchivedProjects() {
    return this.getAllProjects().filter((project) => project.isArchived);
  }

  getProjectsByOwner(owner) {
    if (!owner) {
      throw new Error('Owner is required');
    }
    return this.getAllProjects().filter((project) => project.owner === owner);
  }

  get projectCount() {
    return this.#projects.size;
  }

  hasProject(projectId) {
    return this.#projects.has(projectId);
  }

  // Task-related methods
  getProjectForTask(taskId) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }
    return this.getAllProjects().find((project) => project.hasTask(taskId)) || null;
  }

  moveTask(taskId, fromProjectId, toProjectId) {
    const fromProject = this.getProjectById(fromProjectId);
    const toProject = this.getProjectById(toProjectId);

    if (!fromProject || !toProject) {
      throw new Error('Both source and destination projects must exist');
    }

    if (!fromProject.hasTask(taskId)) {
      throw new Error('Task does not exist in source project');
    }

    if (toProject.hasTask(taskId)) {
      throw new Error('Task already exists in destination project');
    }

    fromProject.removeTask(taskId);
    toProject.addTask(taskId);
  }

  toJSON() {
    return {
      projects: Array.from(this.#projects.values()).map((project) => project.toJSON()),
    };
  }
}

export default ProjectList;
