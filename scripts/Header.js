class Header {
    selectors = {
        root: '[data-js-header]',
        body: '[data-js-header-body]',
        logo: '[data-js-header-logo]',
        overlay: '[data-js-header-overlay]',
        headerLinck: '.header__menu-linck',
        burgerButton: '[data-js-burger-button]',
        signInForm: '[data-js-sign-in]',
        signUpForm: '[data-js-sign-up]',
        signInHeader: '[data-js-sign-in-header]',
        signUpHeader: '[data-js-sign-up-header]',
        span:'[data-js-header-span]',
        signInCross: '[data-js-sign-in-cross]',
        signUpCross: '[data-js-sign-up-cross]',
        signInLink: '[data-js-sign-in-link]',
        signUpLink: '[data-js-sign-up-link]',
        hero: '[data-js-hero]',
    }

    stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        activeForm: 'active-form',
        lockForm: 'lock-form',
        isDimmed: 'dimmed',
        fixed: 'fixed',
    }

    constructor() {
        this.rootElement = document.querySelector(this.selectors.root);
        this.bodyElement = this.rootElement.querySelector(this.selectors.body);
        this.logoElement = this.rootElement.querySelector(this.selectors.logo);
        this.logoElements = this.rootElement.querySelectorAll(this.selectors.logo + ' .logo__img');
        this.overlayElement = this.rootElement.querySelector(this.selectors.overlay);
        this.headerLinckElements = document.querySelectorAll(this.selectors.headerLinck);
        this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
        this.signInFormElement = document.querySelector(this.selectors.signInForm);
        this.signUpFormElement = document.querySelector(this.selectors.signUpForm);
        this.signInHeaderElement = document.querySelector(this.selectors.signInHeader);
        this.signUpHeaderElement = document.querySelector(this.selectors.signUpHeader);
        this.spanElement = document.querySelector(this.selectors.span);
        this.signInCrossElement = document.querySelector(this.selectors.signInCross);
        this.signUpCrossElement = document.querySelector(this.selectors.signUpCross);
        this.signInLinkElement = document.querySelector(this.selectors.signInLink);
        this.signUpLinkElement = document.querySelector(this.selectors.signUpLink);
        this.heroElement = document.querySelector(this.selectors.hero);

        this.isSmallScreen = window.innerWidth <= 830;
        this.bindEvents();

        window.addEventListener('resize', () => {
            const newIsSmallScreen = window.innerWidth <= 830;
            if (newIsSmallScreen !== this.isSmallScreen) {
                this.isSmallScreen = newIsSmallScreen;
                this.unbindEvents();
                this.bindEvents();
            }
        });

        this.formInstance = null;
        this.checkFormActivity();

        // Add scroll event listener for fixed header
        this.scrollHandler = this.handleScroll.bind(this); // Bind the 'this' context
        window.addEventListener('scroll', this.scrollHandler);

        if (this.logoElements.length > 0) {
            this.logoElements[0].classList.add(this.stateClasses.fixed);
        }
    }

    // New method to handle scroll event
    handleScroll() {
        if (!this.heroElement) return; // Проверка на существование heroElement

        const heroHeight = this.heroElement.offsetHeight;
        const scrollPosition = window.scrollY || window.pageYOffset;

        const toggleFixedClass = (element, shouldAdd) => {
            if (shouldAdd) {
                element.classList.add(this.stateClasses.fixed);
            } else {
                element.classList.remove(this.stateClasses.fixed);
            }
        };

        if (scrollPosition >= heroHeight) {
            this.rootElement.classList.add(this.stateClasses.fixed);
            this.bodyElement.classList.add(this.stateClasses.fixed);
            this.headerLinckElements.forEach(link => toggleFixedClass(link, true));
            this.signInHeaderElement.classList.add(this.stateClasses.fixed);
            this.signUpHeaderElement.classList.add(this.stateClasses.fixed);
            this.spanElement.classList.add(this.stateClasses.fixed);
            if (this.logoElements.length > 1) {
                this.logoElements[1].classList.add(this.stateClasses.fixed); // Скрываем первый логотип
                this.logoElements[0].classList.remove(this.stateClasses.fixed); // Показываем второй логотип
            }
        } else {
            this.rootElement.classList.remove(this.stateClasses.fixed);
            this.bodyElement.classList.remove(this.stateClasses.fixed);
            this.headerLinckElements.forEach(link => toggleFixedClass(link, false));
            this.signInHeaderElement.classList.remove(this.stateClasses.fixed);
            this.signUpHeaderElement.classList.remove(this.stateClasses.fixed);
            this.spanElement.classList.remove(this.stateClasses.fixed);
            if (this.logoElements.length > 1) {
                this.logoElements[1].classList.remove(this.stateClasses.fixed); // Показываем первый логотип
                this.logoElements[0].classList.add(this.stateClasses.fixed); // Скрываем второй логотип
            }
        }
    }

    onBurgerButtonClick = () => {
        this.toggleMenuState();
    }

    onBodyClick = (event) => {
        if (this.overlayElement.classList.contains(this.stateClasses.isActive) &&
            !this.rootElement.contains(event.target)) {
            this.toggleMenuState();
        }
    }

    toggleMenuState = () => {
        this.logoElement.classList.toggle(this.stateClasses.isDimmed);
        this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
        this.overlayElement.classList.toggle(this.stateClasses.isActive);
        document.documentElement.classList.toggle(this.stateClasses.isLock);

        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(el => {
            if (el !== this.rootElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
    }

    toggleSignInFormElement = () => {
        document.documentElement.classList.toggle(this.stateClasses.lockForm);
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
        this.signInFormElement.classList.toggle(this.stateClasses.activeForm);
        this.checkFormActivity();
    }

    toggleSignUpFormElement = () => {
        document.documentElement.classList.toggle(this.stateClasses.lockForm);
        const bodyChildren = Array.from(document.body.children);
        bodyChildren.forEach(el => {
            if (el !== this.signInFormElement && el !== this.signUpFormElement) {
                el.classList.toggle(this.stateClasses.isDimmed);
            }
        });
        this.signUpFormElement.classList.toggle(this.stateClasses.activeForm);
        this.checkFormActivity();
    }

    checkFormActivity() {
        const isSignInActive = this.signInFormElement && this.signInFormElement.classList.contains(this.stateClasses.activeForm);
        const isSignUpActive = this.signUpFormElement && this.signUpFormElement.classList.contains(this.stateClasses.activeForm);

        if (isSignInActive || isSignUpActive) {
            if (!this.formInstance) {
                const activeFormElement = isSignInActive ? this.signInFormElement : this.signUpFormElement;
                this.formInstance = new Form(activeFormElement);
            }
        } else {
            if (this.formInstance) {
                this.formInstance = null;
            }
        }
    }

    bindEvents() {
        this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
        document.body.addEventListener('click', this.onBodyClick);

        if (this.signInHeaderElement) {
            this.signInHeaderElement.addEventListener('click', this.toggleSignInFormElement);
            if (this.isSmallScreen) {
                this.signInHeaderElement.addEventListener('click', this.toggleMenuState);
            }
        }
        if (this.signUpHeaderElement) {
            this.signUpHeaderElement.addEventListener('click', this.toggleSignUpFormElement);
            if (this.isSmallScreen) {
                this.signUpHeaderElement.addEventListener('click', this.toggleMenuState);
            }
        }
        if (this.signInCrossElement) {
            this.signInCrossElement.addEventListener('click', this.toggleSignInFormElement);
        }
        if (this.signUpCrossElement) {
            this.signUpCrossElement.addEventListener('click', this.toggleSignUpFormElement);
        }

        if (this.signUpLinkElement) {
            this.signUpLinkElement.addEventListener('click', this.toggleSignInFormElement);
            this.signUpLinkElement.addEventListener('click', this.toggleSignUpFormElement);
        }

        if (this.signInLinkElement) {
            this.signInLinkElement.addEventListener('click', this.toggleSignUpFormElement);
            this.signInLinkElement.addEventListener('click', this.toggleSignInFormElement);
        }
    }

    unbindEvents() {
        if (this.signInHeaderElement) {
            this.signInHeaderElement.removeEventListener('click', this.toggleSignInFormElement);
        }
        if (this.signUpHeaderElement) {
            this.signUpHeaderElement.removeEventListener('click', this.toggleSignUpFormElement);
        }

        // Remove scroll event listener when unbinding events (important for cleanup)
        window.removeEventListener('scroll', this.scrollHandler);
    }
}


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
        //this.confirmPasswordContent = this.inputConfirmPasswordElement ? this.inputConfirmPasswordElement.value : '';

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

        if(this.inputConfirmPasswordElement) {
            this.confirmPasswordContent = this.inputConfirmPasswordElement ? this.inputConfirmPasswordElement.value : '';
            if (this.passwordContent !== this.confirmPasswordContent) {
                this.fieldConfirmPasswordElement.classList.add(this.stateClasses.activeError);
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

export default Header
