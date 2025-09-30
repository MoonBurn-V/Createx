class LogInForm {

    selectors = {
        fieldName: '[data-js-field-name]',
        inputName: '[data-js-input-name]',
        fieldEmail: '[data-js-field-email]',
        fieldPassword: '[data-js-field-password]',
        fieldConfirmPassword: '[data-js-field-confirm-password]',
        inputEmail: '[data-js-input-email]',
        inputPassword: '[data-js-input-password]',
        inputConfirmPassword: '[data-js-input-confirm-password]',
        viewingPassword: '[data-js-viewing-password]',
        viewingConfirmPassword: '[data-js-viewing-confirm-password]',
        buttonForm: '[data-js-form-button]',
        signInCross: '[data-js-sign-in-cross]',
        signUpCross: '[data-js-sign-up-cross]',
        signInLink: '[data-js-sign-in-link]',
        signUpLink: '[data-js-sign-up-link]',
    }

    stateClasses = {
        activeError: 'active-error',
        lockForm: 'lock-form',
        isDimmed: 'dimmed',
        activeViewing: 'active-viewing',
        hide: 'hide'
    }

    constructor(header, activeFormElement) {
        this.header = header;
        this.activeFormElement = activeFormElement;
        this.fieldNameElement = this.activeFormElement.querySelector(this.selectors.fieldName);
        this.inputNameElement = this.activeFormElement.querySelector(this.selectors.inputName);
        this.fieldEmailElement = this.activeFormElement.querySelector(this.selectors.fieldEmail);
        this.fieldPasswordElement = this.activeFormElement.querySelector(this.selectors.fieldPassword);
        this.fieldConfirmPasswordElement = this.activeFormElement.querySelector(this.selectors.fieldConfirmPassword);
        this.inputEmailElement = this.activeFormElement.querySelector(this.selectors.inputEmail);
        this.inputPasswordElement = this.activeFormElement.querySelector(this.selectors.inputPassword);
        this.inputConfirmPasswordElement = this.activeFormElement.querySelector(this.selectors.inputConfirmPassword);
        this.viewingPasswordElement = this.activeFormElement.querySelector(this.selectors.viewingPassword);
        this.viewingConfirmPasswordElement = this.activeFormElement.querySelector(this.selectors.viewingConfirmPassword);
        this.buttonFormElement = this.activeFormElement.querySelector(this.selectors.buttonForm);
        this.signInCrossElement = document.querySelector(this.selectors.signInCross);
        this.signUpCrossElement = document.querySelector(this.selectors.signUpCross);
        this.signInLinkElement = document.querySelector(this.selectors.signInLink);
        this.signUpLinkElement = document.querySelector(this.selectors.signUpLink);
        this.users = []
        this.initData();
        this.bindEvents();
    }

    initData() {
        fetch('./users-info/users.json')
        .then(response => response.json())
        .then(data => {
            this.users = data
        })

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

        if (this.signInCrossElement) {
            this.signInCrossElement.addEventListener('click', this.closeForm)
        }
        
        if (this.signUpCrossElement) {
            this.signUpCrossElement.addEventListener('click', this.closeForm)
        }

        if (this.signInLinkElement) {
            this.signInLinkElement.addEventListener('click', this.openSignIn)
        }

        if (this.signUpLinkElement) {
            this.signUpLinkElement.addEventListener('click', this.openSignUp)
        }
    }

    openSignIn = () => {
        this.closeForm
        this.header.addSignInFormElement()
    }

    openSignUp = () => {
        this.closeForm
        this.header.addSignUpFormElement()
    }

    closeForm = () => {
        document.body.classList.remove(this.stateClasses.lockForm)

        this.header.bodyChildren.forEach(el => {
            if (el !== this.signRootElement) {
                el.classList.remove(this.stateClasses.isDimmed)
                el.inert = false
            }
        })

        this.header.activeSignForm.closActiveForm()
    }

    checkingInputContents = (event) => {
        this.emailContent = this.inputEmailElement ? this.inputEmailElement.value : '';
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.passwordContent = this.inputPasswordElement ? this.inputPasswordElement.value : '';
        this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (this.fieldNameElement) {
            this.nameContent = this.inputNameElement.value;

            if (this.nameContent === '') {
                this.fieldNameElement.classList.add(this.stateClasses.activeError);
                event.preventDefault();
            } else {
                this.fieldNameElement.classList.remove(this.stateClasses.activeError);
            }
        }

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

                if(this.passwordContent === this.confirmPasswordContent 
                    && this.emailRegex.test(this.emailContent) 
                    && this.passwordRegex.test(this.passwordContent)
                    && this.nameContent !== '') {
                    alert('Registration successful!')
                    this.header.toggleSignUpFormElement()
                    this.header.inertFolseSignUp()
                    localStorage.setItem('isLoggedIn', 'true')
                    this.header.updateHeaderButtons()
                    event.preventDefault()
                }
            }
        }

        if (!this.inputConfirmPasswordElement) {
            if (this.emailRegex.test(this.emailContent) && this.passwordRegex.test(this.passwordContent)) {
                let foundMatch = false

                for (const user of this.users) {
                    const userMail = user.mail
                    const userPasswor = user.password

                    if (this.emailContent === userMail && this.passwordContent === userPasswor) {
                        this.header.toggleSignInFormElement();
                        this.header.inertFolseSignIn();
                        localStorage.setItem('isLoggedIn', 'true');
                        this.header.updateHeaderButtons();
                        event.preventDefault();
                        foundMatch = true;
                        break;
                    }
                }

                if (!foundMatch) {
                    const userResponse = confirm("Sorry you didn't register. Please complete the registration process")

                    if (userResponse) {
                        this.closeForm
                        this.header.addSignUpFormElement()
                    }

                    event.preventDefault()
                }
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