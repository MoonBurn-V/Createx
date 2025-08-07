class LogInForm {
    constructor() {
        this.activeFormElement = null;
        this.selectors = {
            fieldEmail: '[data-js-field-email]',
            fieldPassword: '[data-js-field-password]',
            fieldConfirmPassword: '[data-js-field-confirm-password]',
            inputEmail: '[data-js-input-email]',
            inputPassword: '[data-js-input-password]',
            inputConfirmPassword: '[data-js-input-confirm-password]',
            viewingPassword: '[data-js-viewing-password]',
            viewingConfirmPassword: '[data-js-viewing-confirm-password]',
            buttonForm: '[data-js-form-button]',
        }

        this.stateClasses = {
            activeError: 'active-error',
            activeViewing: 'active-viewing',
        }

        this.fieldEmailElement = null;
        this.fieldPasswordElement = null;
        this.fieldConfirmPasswordElement = null;
        this.inputEmailElement = null;
        this.inputPasswordElement = null;
        this.inputConfirmPasswordElement = null;
        this.viewingPasswordElement = null;
        this.viewingConfirmPasswordElement = null;
        this.buttonFormElement = null;

        this.bindEvents();
    }

    setActiveForm(formElement) {
        this.activeFormElement = formElement;
        this.initializeFormElements();
    }

    initializeFormElements() {
        this.fieldEmailElement = this.activeFormElement.querySelector(this.selectors.fieldEmail);
        this.fieldPasswordElement = this.activeFormElement.querySelector(this.selectors.fieldPassword);
        this.fieldConfirmPasswordElement = this.activeFormElement.querySelector(this.selectors.fieldConfirmPassword);
        this.inputEmailElement = this.activeFormElement.querySelector(this.selectors.inputEmail);
        this.inputPasswordElement = this.activeFormElement.querySelector(this.selectors.inputPassword);
        this.inputConfirmPasswordElement = this.activeFormElement.querySelector(this.selectors.inputConfirmPassword);
        this.viewingPasswordElement = this.activeFormElement.querySelector(this.selectors.viewingPassword);
        this.viewingConfirmPasswordElement = this.activeFormElement.querySelector(this.selectors.viewingConfirmPassword);
        this.buttonFormElement = this.activeFormElement.querySelector(this.selectors.buttonForm);
        this.bindEventsToActiveForm();
    }

    bindEventsToActiveForm() {
        if (this.buttonFormElement) {
            this.buttonFormElement.addEventListener('click', this.checkingInputContents);
        }

        if (this.viewingPasswordElement) {
            this.viewingPasswordElement.addEventListener('click', this.togglePasswordVisibility);
        }

        if (this.viewingConfirmPasswordElement) {
            this.viewingConfirmPasswordElement.addEventListener('click', this.toggleConfirmPasswordVisibility)
        }

    }

    bindEvents() {}

    checkingInputContents = (event) => {
        this.emailContent = this.inputEmailElement ? this.inputEmailElement.value : '';
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.passwordContent = this.inputPasswordElement ? this.inputPasswordElement.value : '';
        this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!this.emailRegex.test(this.emailContent)) {
            this.fieldEmailElement.classList.add(this.stateClasses.activeError);
            event.preventDefault();
        } else if (this.emailRegex.test(this.emailContent)) {
            this.fieldEmailElement.classList.remove(this.stateClasses.activeError);
        }

        if (!this.passwordRegex.test(this.passwordContent)) {
            this.fieldPasswordElement.classList.add(this.stateClasses.activeError);
            event.preventDefault();
        } else if (this.passwordRegex.test(this.passwordContent)) {
            this.fieldPasswordElement.classList.remove(this.stateClasses.activeError);
        }

        if(this.inputConfirmPasswordElement) {
            this.confirmPasswordContent = this.inputConfirmPasswordElement ? this.inputConfirmPasswordElement.value : '';
            if (this.passwordContent !== this.confirmPasswordContent) {
                this.fieldConfirmPasswordElement.classList.add(this.stateClasses.activeError);
                event.preventDefault();
            } else if (this.passwordContent === this.confirmPasswordContent) {
                this.fieldConfirmPasswordElement.classList.remove(this.stateClasses.activeError);
            }
        }
    }

    togglePasswordVisibility = (event) => {
        event.preventDefault();

        if (this.inputPasswordElement) {
            if (this.inputPasswordElement.type === 'password') {
                this.inputPasswordElement.type = 'text';
            } else {
                this.inputPasswordElement.type = 'password';
            }
        }

        this.viewingPasswordElement.classList.toggle(this.stateClasses.activeViewing);
    }

    toggleConfirmPasswordVisibility = (event) => {
        event.preventDefault();

        if (this.inputConfirmPasswordElement) {
            if (this.inputConfirmPasswordElement.type === 'password') {
                this.inputConfirmPasswordElement.type = 'text';
            } else {
                this.inputConfirmPasswordElement.type = 'password';
            }
        }

        if(this.viewingConfirmPasswordElement) {
            this.viewingConfirmPasswordElement.classList.toggle(this.stateClasses.activeViewing);
        }
    }
}

export default LogInForm;