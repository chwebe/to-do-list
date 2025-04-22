// ProjectStorage Class

import Project from '../models/project/Project';
import Task from '../models/task/Task';

class ProjectStorage {
    #storageKey = 'projects';

    constructor() {
        if (!localStorage.getItem(this.#storageKey)) {
            localStorage.setItem(this.#storageKey, JSON.stringify({}));
        }
    }

    // Save a project and all its tasks
    saveProject(project) {
        if (!(project instanceof Project)) {
            throw new Error('Invalid project object');
        }

        const projects = this.#getAllProjectsFromStorage();
        projects[project.name] = project.toJSON();
        this.#saveToStorage(projects);
        return true;
    }

    // Get a project by name
    getProject(projectName) {
        if (!projectName) {
            throw new Error('Project name is required');
        }

        const projects = this.#getAllProjectsFromStorage();
        const projectData = projects[projectName];
        
        if (!projectData) {
            return null;
        }

        return this.#createProjectFromData(projectData);
    }

    // Get all projects
    getAllProjects() {
        const projects = this.#getAllProjectsFromStorage();
        return Object.values(projects).map(projectData => 
            this.#createProjectFromData(projectData)
        );
    }

    // Delete a project and all its tasks
    deleteProject(projectName) {
        const projects = this.#getAllProjectsFromStorage();
        if (!projects[projectName]) {
            return false;
        }

        delete projects[projectName];
        this.#saveToStorage(projects);
        return true;
    }

    // Search tasks across all projects
    searchTasks(query) {
        if (!query) return [];

        const searchLower = query.toLowerCase();
        const projects = this.#getAllProjectsFromStorage();
        const results = [];

        Object.values(projects).forEach(projectData => {
            if (projectData.tasks) {
                Object.values(projectData.tasks)
                    .filter(taskData => 
                        taskData.title.toLowerCase().includes(searchLower) ||
                        (taskData.description && taskData.description.toLowerCase().includes(searchLower)) ||
                        (taskData.tags && taskData.tags.some(tag => tag.toLowerCase().includes(searchLower)))
                    )
                    .forEach(taskData => {
                        results.push({
                            projectName: projectData.name,
                            task: this.#createTaskFromData(taskData)
                        });
                    });
            }
        });

        return results;
    }

    // Private helper methods
    #getAllProjectsFromStorage() {
        const projectsJson = localStorage.getItem(this.#storageKey);
        return JSON.parse(projectsJson);
    }

    #saveToStorage(projects) {
        localStorage.setItem(this.#storageKey, JSON.stringify(projects));
    }

    #createProjectFromData(projectData) {
        // Create project instance
        const project = new Project({
            name: projectData.name,
            description: projectData.description,
            owner: projectData.owner
        });

        // Add tasks if they exist
        if (projectData.tasks) {
            Object.values(projectData.tasks).forEach(taskData => {
                const task = this.#createTaskFromData(taskData);
                project.addTask(task);
            });
        }

        return project;
    }

    #createTaskFromData(taskData) {
        return new Task({
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            tags: taskData.tags
        });
    }
}

export default ProjectStorage;
