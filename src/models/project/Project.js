import Task from '../task/Task';
import TaskList from '../task/TaskList';

class Project {
  #id;

  #name;

  #description;

  #createdAt;

  #lastModified;

  #taskList;

  #status;

  #color;

  #owner;

  static #VALID_STATUSES = ['active', 'completed', 'archived'];

  static #VALID_COLORS = ['blue', 'green', 'red', 'yellow', 'purple', 'gray'];

  constructor(data = {}) {
    // Generate unique id and set timestamps
    this.#id = crypto.randomUUID();
    this.#createdAt = new Date();
    this.#lastModified = new Date();

    // Initialize task list
    this.#taskList = new TaskList();

    // Set default values
    this.#status = 'active';
    this.#color = 'blue';

    // Set initial values through setters for validation
    if (data.name) this.name = data.name;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.color) this.color = data.color;
    if (data.owner) this.owner = data.owner;
  }

  // ID - Read only
  get id() {
    return this.#id;
  }

  // Name
  get name() {
    return this.#name;
  }

  set name(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Project name must be a non-empty string');
    }
    const trimmed = value.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      throw new Error('Project name must be between 1 and 100 characters');
    }
    this.#name = trimmed;
    this.#updateLastModified();
  }

  // Description
  get description() {
    return this.#description;
  }

  set description(value) {
    if (value !== undefined && value !== null) {
      if (typeof value !== 'string') {
        throw new Error('Description must be a string');
      }
      this.#description = value.trim();
      this.#updateLastModified();
    }
  }

  // Status
  get status() {
    return this.#status;
  }

  set status(value) {
    if (!Project.#VALID_STATUSES.includes(value)) {
      throw new Error(`Status must be one of: ${Project.#VALID_STATUSES.join(', ')}`);
    }
    this.#status = value;
    this.#updateLastModified();
  }

  // Color
  get color() {
    return this.#color;
  }

  set color(value) {
    if (!Project.#VALID_COLORS.includes(value)) {
      throw new Error(`Color must be one of: ${Project.#VALID_COLORS.join(', ')}`);
    }
    this.#color = value;
    this.#updateLastModified();
  }

  // Owner
  get owner() {
    return this.#owner;
  }

  set owner(value) {
    if (value && typeof value !== 'string') {
      throw new Error('Owner must be a string');
    }
    this.#owner = value;
    this.#updateLastModified();
  }

  // Created At - Read only
  get createdAt() {
    return new Date(this.#createdAt);
  }

  // Last Modified - Read only
  get lastModified() {
    return new Date(this.#lastModified);
  }

  // Task Management
  addTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Only Task objects can be added to Project');
    }
    this.#taskList.addTask(task);
    this.#updateLastModified();
  }

  removeTask(taskId) {
    const removed = this.#taskList.removeTask(taskId);
    if (removed) {
      this.#updateLastModified();
    }
    return removed;
  }

  hasTask(taskId) {
    return this.#taskList.hasTask(taskId);
  }

  getTaskById(taskId) {
    return this.#taskList.getTaskById(taskId);
  }

  getAllTasks() {
    return this.#taskList.getAllTasks();
  }

  get taskCount() {
    return this.#taskList.taskCount;
  }

  // Computed Properties
  get isActive() {
    return this.#status === 'active';
  }

  get isCompleted() {
    return this.#status === 'completed';
  }

  get isArchived() {
    return this.#status === 'archived';
  }

  // Helper Methods
  #updateLastModified() {
    this.#lastModified = new Date();
  }

  // Public Methods
  archive() {
    this.status = 'archived';
  }

  activate() {
    this.status = 'active';
  }

  complete() {
    this.status = 'completed';
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
      status: this.#status,
      color: this.#color,
      owner: this.#owner,
      createdAt: this.#createdAt.toISOString(),
      lastModified: this.#lastModified.toISOString(),
      tasks: this.#taskList.toJSON(),
    };
  }
}

export default Project;
