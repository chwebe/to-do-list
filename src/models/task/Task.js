// Task Class - Represents a single task item in the todo list

class Task {
  // Private fields
  #id;
  #title;
  #description;
  #status;
  #createdAt;
  #dueDate;
  #projectId;
  #lastModified;
  #priority;
  #tags;

  // Valid status values
  static #VALID_STATUSES = ['pending', 'in-progress', 'completed'];

  // Valid priority levels
  static #VALID_PRIORITIES = ['low', 'medium', 'high'];

  constructor(data = {}) {
    // Generate unique id and set creation timestamp
    this.#id = crypto.randomUUID();
    this.#createdAt = new Date();
    this.#lastModified = new Date();

    // Initialize with empty arrays/defaults
    this.#tags = [];
    this.#status = 'pending';
    this.#priority = 'medium';

    // Set initial values through setters for validation
    if (data.title) this.title = data.title;
    if (data.description) this.description = data.description;
    if (data.status) this.status = data.status;
    if (data.dueDate) this.dueDate = data.dueDate;
    if (data.projectId) this.projectId = data.projectId;
    if (data.priority) this.priority = data.priority;
    if (data.tags) this.tags = data.tags;
  }

  // ID - Read only
  get id() {
    return this.#id;
  }

  // Title
  get title() {
    return this.#title;
  }

  set title(value) {
    if (!value || typeof value !== 'string') {
      throw new Error('Title must be a non-empty string');
    }
    const trimmed = value.trim();
    if (trimmed.length < 1 || trimmed.length > 100) {
      throw new Error('Title must be between 1 and 100 characters');
    }
    this.#title = trimmed;
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
    if (!Task.#VALID_STATUSES.includes(value)) {
      throw new Error(`Status must be one of: ${Task.#VALID_STATUSES.join(', ')}`);
    }
    this.#status = value;
    this.#updateLastModified();
  }

  // Created At - Read only
  get createdAt() {
    return new Date(this.#createdAt);
  }

  // Due Date
  get dueDate() {
    return this.#dueDate ? new Date(this.#dueDate) : null;
  }

  set dueDate(value) {
    if (value === null || value === undefined) {
      this.#dueDate = null;
    } else {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      this.#dueDate = date;
    }
    this.#updateLastModified();
  }

  // Project ID
  get projectId() {
    return this.#projectId;
  }

  set projectId(value) {
    this.#projectId = value;
    this.#updateLastModified();
  }

  // Last Modified - Read only
  get lastModified() {
    return new Date(this.#lastModified);
  }

  // Priority
  get priority() {
    return this.#priority;
  }

  set priority(value) {
    if (!Task.#VALID_PRIORITIES.includes(value)) {
      throw new Error(`Priority must be one of: ${Task.#VALID_PRIORITIES.join(', ')}`);
    }
    this.#priority = value;
    this.#updateLastModified();
  }

  // Tags
  get tags() {
    return [...this.#tags]; // Return a copy to prevent direct modification
  }

  set tags(value) {
    if (!Array.isArray(value)) {
      throw new Error('Tags must be an array');
    }
    this.#tags = value.map((tag) => {
      if (typeof tag !== 'string') {
        throw new Error('All tags must be strings');
      }
      return tag.trim().toLowerCase();
    });
    this.#updateLastModified();
  }

  // Computed Properties

  get isCompleted() {
    return this.#status === 'completed';
  }

  get isOverdue() {
    if (!this.#dueDate || this.isCompleted) return false;
    return new Date() > this.#dueDate;
  }

  get formattedDueDate() {
    if (!this.#dueDate) return 'No due date';
    return this.#dueDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  get timeRemaining() {
    if (!this.#dueDate || this.isCompleted) return null;
    const now = new Date();
    const diff = this.#dueDate - now;

    if (diff < 0) return 'Overdue';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days} days ${hours} hours`;
    return `${hours} hours`;
  }

  // Helper Methods

  #updateLastModified() {
    this.#lastModified = new Date();
  }

  // Public Methods

  addTag(tag) {
    if (typeof tag !== 'string') {
      throw new Error('Tag must be a string');
    }
    const normalizedTag = tag.trim().toLowerCase();
    if (!this.#tags.includes(normalizedTag)) {
      this.#tags.push(normalizedTag);
      this.#updateLastModified();
    }
  }

  removeTag(tag) {
    const normalizedTag = tag.trim().toLowerCase();
    const index = this.#tags.indexOf(normalizedTag);
    if (index !== -1) {
      this.#tags.splice(index, 1);
      this.#updateLastModified();
    }
  }

  toggleStatus() {
    this.status = this.isCompleted ? 'pending' : 'completed';
  }

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      status: this.#status,
      createdAt: this.#createdAt.toISOString(),
      dueDate: this.#dueDate ? this.#dueDate.toISOString() : null,
      projectId: this.#projectId,
      lastModified: this.#lastModified.toISOString(),
      priority: this.#priority,
      tags: [...this.#tags],
    };
  }
}

export default Task;
