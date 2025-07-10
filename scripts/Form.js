class Form {
    constructor(formElement) {
        this.formElement = formElement;

        this.selectors = {
            fieldEmail: '[data-js-field-email]',
            fieldPassword: '[data-js-field-password]',
            fieldConfirmPassword: '[data-js-field-confirm-password]',
            inputName: '[data-js-input-name]',
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


        this.fieldEmailElement = this.formElement.querySelector(this.selectors.fieldEmail);
        this.fieldPasswordElement = this.formElement.querySelector(this.selectors.fieldPassword);
        this.fieldConfirmPasswordElement = this.formElement.querySelector(this.selectors.fieldConfirmPassword);
        this.inputNameElement = this.formElement.querySelector(this.selectors.inputName);
        this.inputEmailElement = this.formElement.querySelector(this.selectors.inputEmail);
        this.inputPasswordElement = this.formElement.querySelector(this.selectors.inputPassword);
        this.inputConfirmPasswordElement = this.formElement.querySelector(this.selectors.inputConfirmPassword);
        this.viewingPasswordElement = this.formElement.querySelector(this.selectors.viewingPassword);
        this.viewingConfirmPasswordElement = this.formElement.querySelector(this.selectors.viewingConfirmPassword);
        this.buttonFormElement = this.formElement.querySelector(this.selectors.buttonForm);

        this.bindEvents();
    }

    bindEvents() {
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

    checkingInputContents = () => {
        this.emailContent = this.inputEmailElement ? this.inputEmailElement.value : '';
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.passwordContent = this.inputPasswordElement ? this.inputPasswordElement.value : '';
        this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        this.confirmPasswordContent = this.inputConfirmPasswordElement ? this.inputConfirmPasswordElement.value : '';

        if (!this.emailRegex.test(this.emailContent)) {
            this.fieldEmailElement.classList.add(this.stateClasses.activeError);
        } else if (this.emailRegex.test(this.emailContent)) {
            this.fieldEmailElement.classList.remove(this.stateClasses.activeError);
        }

        if (!this.passwordRegex.test(this.passwordContent)) {
            this.fieldPasswordElement.classList.add(this.stateClasses.activeError);
        } else if (this.passwordRegex.test(this.passwordContent)) {
            this.fieldPasswordElement.classList.remove(this.stateClasses.activeError);
        }

        if (this.passwordContent !== this.confirmPasswordContent) {
            this.fieldConfirmPasswordElement.classList.add(this.stateClasses.activeError);
        } else if (this.passwordContent === this.confirmPasswordContent) {
            this.fieldConfirmPasswordElement.classList.remove(this.stateClasses.activeError);
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

        this.viewingConfirmPasswordElement.classList.toggle(this.stateClasses.activeViewing)
    }
}

const signInFormElement = document.querySelector('.sign-in .registered__form');
const signUpFormElement = document.querySelector('.sign-up .registered__form');

if (signInFormElement) {
    new Form(signInFormElement);
}

if (signUpFormElement) {
    new Form(signUpFormElement);
}

export default Form;