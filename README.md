# Todo List Application

A vanilla JavaScript todo list application built using Object-Oriented Programming (OOP) principles and following the Single Responsibility Principle (SRP) from SOLID design patterns.

## Project Structure

```
src/
├── models/           # Data models and business logic
│   ├── task/        # Task-related models
│   │   ├── Task.js      # Handles individual task data
│   │   └── TaskList.js  # Manages collection of tasks
│   └── project/     # Project-related models
│       ├── Project.js    # Handles individual project data
│       └── ProjectList.js # Manages collection of projects
│
├── services/        # Services for external operations
│   ├── TaskStorage.js    # Handles task data persistence
│   └── ProjectStorage.js # Handles project data persistence
│
├── views/           # UI rendering logic
│   ├── task/       # Task-related views
│   │   └── TaskView.js  # Manages task DOM manipulation
│   └── project/    # Project-related views
│       └── ProjectView.js # Manages project DOM manipulation
│
├── handlers/        # Input handling
│   ├── task/       # Task-related handlers
│   │   └── TaskFormHandler.js  # Task form processing
│   └── project/    # Project-related handlers
│       └── ProjectFormHandler.js # Project form processing
│
├── events/          # Event management
│   └── TaskEventManager.js # Event handling
│
└── App.js          # Main application entry point
```

## Class Descriptions

### Models
- **Task Class**: Represents a single todo item with properties like id, title, description, status, and creation date.
- **TaskList Class**: Manages the collection of tasks, providing methods for adding, removing, and filtering tasks.
- **Project Class**: Represents a project that can contain multiple tasks, with properties like id, name, description, and creation date.
- **ProjectList Class**: Manages the collection of projects, providing methods for adding, removing, and filtering projects.

### Services
- **TaskStorage Class**: Handles task data persistence using localStorage, including saving and loading tasks.
- **ProjectStorage Class**: Handles project data persistence using localStorage, including saving and loading projects and their associated tasks.

### Views
- **TaskView Class**: Responsible for rendering tasks and updating the UI.
- **ProjectView Class**: Responsible for rendering projects and their associated tasks in the UI.

### Handlers
- **TaskFormHandler Class**: Manages task form submissions and input validation.
- **ProjectFormHandler Class**: Manages project form submissions and input validation.

### Events
- **TaskEventManager Class**: Coordinates event listeners and callbacks throughout the application.

### App
- **App Class**: Main application class that orchestrates all components.

## Object-Oriented Programming Principles

This project demonstrates the following OOP principles:

1. **Encapsulation**: Each class encapsulates its data and behaviors.
2. **Single Responsibility**: Each class has one specific purpose.
3. **Modularity**: Components are independent and interchangeable.
4. **Clean Architecture**: Clear separation between UI, business logic, and data layers.

## Features

- Create, Read, Update, and Delete (CRUD) tasks
- Create, Read, Update, and Delete (CRUD) projects
- Organize tasks within projects
- Mark tasks as complete/incomplete
- Persist tasks and projects in localStorage
- Filter tasks by status and project
- Clean and intuitive user interface

## Getting Started

1. Clone the repository
2. Open index.html in your browser
3. Start managing your projects and tasks!

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

To modify or extend the application:

1. Each class is in its own file for easy maintenance
2. Follow the existing pattern of single responsibility
3. Maintain separation of concerns
4. Document any new methods or classes added

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
