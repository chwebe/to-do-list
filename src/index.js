// Example module import
import Task from './models/task/Task';
import Project from './models/project/Project';
import ProjectStorage from './services/ProjectStorage';

import './style.css';
// Initialize project storage
const projectStorage = new ProjectStorage();

// 1. Create a new project
const project = new Project({
  name: 'Website Redesign',
  description: 'Redesign company website',
  owner: 'John Doe',
});

const project2 = new Project({
  name: 'Web Development',
  description: 'Develop company website',
  owner: 'Jane Doe',
});

// 2. Create tasks
const task1 = new Task({
  title: 'Design Homepage',
  description: 'Create new homepage layout',
  priority: 'high',
  tags: ['design', 'frontend']
});

const task2 = new Task({
  title: 'Setup Navigation',
  description: 'Implement responsive navigation menu',
  priority: 'medium',
  tags: ['frontend']
});

project.addTask(task1);
project.addTask(task2);

console.log('\nProject before save:', project.toJSON());

try {
  // Save project with its tasks
  projectStorage.saveProject(project);
  projectStorage.saveProject(project2);
  console.log('Project and tasks saved successfully');
  
  // Verify storage
  const savedProject = projectStorage.getProject(project.name);
  console.log('\nProject after save:', savedProject.toJSON());
  
  // Update a task
  task1.status = 'in-progress';
  projectStorage.saveProject(project);
  
  // Verify update
  const updatedProject = projectStorage.getProject(project.name);
  console.log('\nProject after task update:', updatedProject.toJSON());

  // Search for tasks
  console.log('\nSearch results for "design":', projectStorage.searchTasks('design'));

} catch (error) {
  console.error('Error:', error.message);
}
