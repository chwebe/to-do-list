// Example module import

import Task from './models/task/Task';
import Project from './models/project/Project';

// 1. Create a new project
const project = new Project({
  name: 'Website Redesign',
  description: 'Redesign company website',
  owner: 'John Doe',
});

// 2. Create some tasks
const task1 = new Task({
  title: 'Design Homepage',
  description: 'Create new homepage layout',
  priority: 'high',
  tags: ['design', 'frontend'],
});

const task2 = new Task({
  title: 'Setup Navigation',
  description: 'Implement responsive navigation menu',
  priority: 'medium',
  tags: ['frontend'],
});

// 3. Add tasks to the project
try {
  // Add first task
  project.addTask(task1);
  console.log(`Task "${task1.title}" added to project "${project.name}"`);
  console.log('Current task count:', project.taskCount);

  // Add second task
  project.addTask(task2);
  console.log(`Task "${task2.title}" added to project "${project.name}"`);
  console.log('Current task count:', project.taskCount);

  // Get all tasks in the project
  const allTasks = project.getAllTasks();
  console.log('\nAll tasks in project:');
  allTasks.forEach((task) => {
    console.log(`- ${task.title} (${task.priority})`);
  });

  // Get a specific task
  const specificTask = project.getTaskById(task1.id);
  if (specificTask) {
    console.log('\nFound specific task:', specificTask.title);
  }

  // Try to add an invalid task (should throw error)
  project.addTask({ title: 'Invalid Task' });
} catch (error) {
  console.error('Error:', error.message);
}

// 4. Demonstrate task removal
try {
  // Remove a task
  const removed = project.removeTask(task1.id);
  if (removed) {
    console.log(`\nTask "${task1.title}" removed from project`);
    console.log('Remaining task count:', project.taskCount);
  }

  // Verify task was removed
  const remainingTasks = project.getAllTasks();
  console.log('\nRemaining tasks:');
  remainingTasks.forEach((task) => {
    console.log(`- ${task.title}`);
  });
} catch (error) {
  console.error('Error:', error.message);
}
