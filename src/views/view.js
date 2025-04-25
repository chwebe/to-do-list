// section for the project view


class FormView {
    constructor() {
        this.form = document.getElementById('CreateTaskForm');
        
    }

    showForm() {
        this.form.style.display = 'flex';
    }

    hideForm() {
        this.form.style.display = 'none';
    }

    clearForm() {
        this.form.reset();
    }

}

export default FormView;
    