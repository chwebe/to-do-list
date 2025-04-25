import Task from '../models/task/Task';
import Project from '../models/project/Project';

class FormData {
    constructor(form) {
        this.form = form;
    }

    getElementValue(element) {
        return this.form.elements[element].value;
    }

    get title() {
        return this.getElementValue('task-title');
    }

    get description() {
        return this.getElementValue('task-description');
    }

    get dueDate() {
        return this.getElementValue('task-due-date');
    }

    get priority() {
        return this.getElementValue('task-priority');
    }

    get status() {
        return this.getElementValue('task-status');
    }

    getAllData() {
        return {
          title: this.title,
          description: this.description,
          dueDate: this.dueDate,
          priority: this.priority,
          status: this.status
        }
    }
}

class FormHandler {
    constructor(formView, project) {
        this.formView = formView;
        this.project = project;
        this.createTaskBtn = document.querySelector('.task-header-button');
    }

    handleSubmit(event) {
        event.preventDefault();
        this.handleFormData();
        this.formView.hideForm();
        this.formView.clearForm();
    }

    handleFormData() {
        const formData = new FormData(this.formView.form);
        console.log(formData.getAllData());
        const task = new Task(formData.getAllData());
        console.log(task);
        this.project.addTask(task);
        console.log(this.project);
    }
    
    initForm() {
        this.createTaskBtn.addEventListener('click', () => {
            this.formView.showForm();
        });
    }
    submitForm() {
        this.formView.form.addEventListener('submit', (event) => {
            this.handleSubmit(event);
        });
    }
}

export { FormData, FormHandler as default };