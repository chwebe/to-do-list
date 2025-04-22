import Task from './Task';

class TaskList {
  #tasks;

  constructor() {
    this.#tasks = [];
  }

  addTask(task) {
    // Validate that the argument is a Task instance
    if (!(task instanceof Task)) {
      throw new Error('Only Task objects can be added to TaskList');
    }

    // Check if task with same ID already exists
    if (this.#tasks.some((t) => t.id === task.id)) {
      throw new Error('Task with this ID already exists');
    }

    this.#tasks.push(task);
  }

  removeTask(taskId) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    const initialLength = this.#tasks.length;
    this.#tasks = this.#tasks.filter((task) => task.id !== taskId);

    // Return true if a task was removed, false otherwise
    return this.#tasks.length < initialLength;
  }

  getTaskById(taskId) {
    if (!taskId) {
      throw new Error('Task ID is required');
    }

    return this.#tasks.find((task) => task.id === taskId) || null;
  }

  getAllTasks() {
    return [...this.#tasks];
  }

  get taskCount() {
    return this.#tasks.length;
  }

  hasTask(taskId) {
    return this.#tasks.some((task) => task.id === taskId);
  }

  toJSON() {
    return this.#tasks.map((task) => task.toJSON());
  }
}

export default TaskList;
